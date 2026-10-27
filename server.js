const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

// Purple Fest Vadodara 2027 · Official Dates: 21–23 January 2027 · www.purplefestivalvadodara.com
// Secretariat: Praangan Education Trust, 1st Floor, Trimurti Apartments, Baroda Imaging Lab Lane, Near Mahalakshmi Store, Alkapuri, Vadodara, Gujarat
// Contacts: Radha Tandon (+91 99743 83920) | Satish Kapoor (+91 98994 72065, +91 92117 60202) | purplefestivalvadodara@gmail.com
// Organisers: Praangan (Vadodara, Gujarat), Brotherhood (Delhi), Centre for Disabilities Studies and Action, School of Social Work, Tata Institute of Social Sciences (Mumbai)
// Knowledge Partner: State Commission for Persons with Disabilities, Goa | Venue Partners: The Maharaja Sayajirao University, Vadodara & GMERS Medical College, Gotri, Vadodara

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const UPSTREAM_ORIGIN = 'https://www.battalion.com';
const CMS_ORIGIN = 'https://battalion-cms.onrender.com';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.rsc': 'text/x-component',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.vtt': 'text/vtt; charset=utf-8',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.hdr': 'image/vnd.radiance',
  '.exr': 'image/x-exr',
  '.ktx2': 'image/ktx2',
  '.wasm': 'application/wasm',
  '.pdf': 'application/pdf',
};

const ROUTE_ALIASES = {
  '/about': '/about-us',
  '/home': '/',
  '/index': '/',
  '/viksit-bharat-2047': '/viksit-bharat',
  '/viksitbharat': '/viksit-bharat',
  '/register': '/events',
  '/registration': '/events',
  '/checkin': '/check-in',
  '/badge': '/pass',
};

const PORTAL_HTML_ROUTES = {
  '/events': 'events.html',
  '/pass': 'pass.html',
  '/check-in': 'check-in.html',
  '/admin': 'admin.html',
};

let apiRouterPromise = null;
function getApiRouter() {
  if (!apiRouterPromise) {
    apiRouterPromise = import('./backend/api-router.mjs');
  }
  return apiRouterPromise;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

async function fileExists(filePath) {
  try {
    const stat = await fsp.stat(filePath);
    return stat.isFile() ? stat : null;
  } catch {
    return null;
  }
}

async function serveFile(req, res, filePath, customContentType = null, rewriteCmsUrls = false) {
  const stat = await fileExists(filePath);
  if (!stat) return false;

  const contentType = customContentType || getMimeType(filePath);
  const ext = path.extname(filePath).toLowerCase();

  // Rewrite any residual CMS URLs in HTML and RSC payloads so all /uploads/* serve locally
  if (rewriteCmsUrls && (ext === '.html' || ext === '.rsc')) {
    let text = await fsp.readFile(filePath, 'utf8');
    text = text.replace(/https:\/\/battalion-cms\.onrender\.com\/uploads\//g, '/uploads/');
    if (ext === '.html') {
      text = text.replace(/\/_next\/static\/css\/0fa3ad3e26d5da69\.css(\?v=[^"']*)?/g, '/_next/static/css/0fa3ad3e26d5da69.css?v=pf5');
      text = text.replace(/\/_next\/static\/chunks\/app\/layout-cacaa35457036801\.js(\?v=[^"']*)?/g, '/_next/static/chunks/app/layout-cacaa35457036801.js?v=pf5');
      const seqBustScript = `<script>(function(){try{var d=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');if(d&&d.set){Object.defineProperty(HTMLImageElement.prototype,'src',{set:function(v){if(typeof v==='string'&&v.indexOf('/sequence/')!==-1&&v.indexOf('?v=')===-1){v=v+'?v=pf3';}return d.set.call(this,v);},get:d.get,configurable:true});}}catch(e){}})();</script>`;
      text = text.replace('<head>', '<head>' + seqBustScript);
    }
    const buf = Buffer.from(text, 'utf8');
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': buf.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    });
    if (req.method === 'HEAD') {
      res.end();
    } else {
      res.end(buf);
    }
    return true;
  }

  // Support HTTP Range requests for video/audio streaming
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm' || ext === '.ogg' || ext === '.mp3')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    if (start >= stat.size || end >= stat.size || isNaN(start) || isNaN(end) || start > end) {
      res.writeHead(416, {
        'Content-Range': `bytes */${stat.size}`,
        'Access-Control-Allow-Origin': '*',
      });
      res.end();
      return true;
    }
    const chunkSize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });
    if (req.method === 'HEAD') {
      res.end();
    } else {
      fs.createReadStream(filePath, { start, end }).pipe(res);
    }
    return true;
  }

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
  });
  if (req.method === 'HEAD') {
    res.end();
  } else {
    fs.createReadStream(filePath).pipe(res);
  }
  return true;
}

function buildPurpleFestPricerPayload() {
  const locks = [15, 30, 45, 60];
  const tiers = [
    { rate: 2.2, base: 2200, mp: 2200, ref: 'Mandatory Delegate Pass (₹2,200)' },
    { rate: 5.5, base: 5500, mp: 5500, ref: 'Tier D · DPO / Grassroots NGO Stall (₹5,500)' },
    { rate: 12.0, base: 12000, mp: 12000, ref: 'Tier C · Assistive Startup Pod (₹12,000)' },
    { rate: 15.0, base: 15000, mp: 15000, ref: 'Tier A · Standard 3m×3m Stall (₹15,000)' },
    { rate: 35.0, base: 35000, mp: 35000, ref: 'Tier B · Corner 6m×3m Pavilion (₹35,000)' },
  ];
  const battalion = [];
  for (const lock of locks) {
    for (const t of tiers) {
      battalion.push({
        rate: t.rate,
        lock,
        base: t.base,
        value: t.base,
        uncapped: t.base,
        monthly_payment: t.mp,
        potential_revenue: t.base,
        sum_of_adjustments: 0,
        lock_adjustment: 0,
        reference: t.ref,
      });
    }
  }
  return {
    battalion,
    other: [],
    battalionAdjusters: {
      'Mandatory Delegate Pass (₹2,200)': {
        adjusters: [
          { name: '3-Day Full Festival Delegate Pass (No Free Entry)', value: 2200 },
          { name: 'All 6 Experience Zones & GIEN/TISS Plenaries', value: 0 },
          { name: '21 RPwD Accommodations (ISL, Braille, Buggy)', value: 0 },
        ],
      },
      'Tier D · DPO / Grassroots NGO Stall (₹5,500)': {
        adjusters: [
          { name: '3m × 2m Subsidized DPO / NGO Marketplace Stall', value: 5500 },
          { name: '2 Complimentary Exhibitor Badges Included', value: 0 },
        ],
      },
      'Tier C · Assistive Startup Pod (₹12,000)': {
        adjusters: [
          { name: 'Assistive Tech Startup & University R&D Demo Pod', value: 12000 },
          { name: '2 Complimentary Exhibitor Badges Included', value: 0 },
        ],
      },
      'Tier A · Standard 3m×3m Stall (₹15,000)': {
        adjusters: [
          { name: '3m × 3m Standard Octanorm Pavilion (Zone 01)', value: 15000 },
          { name: '2 Complimentary Exhibitor Badges Included', value: 0 },
        ],
      },
      'Tier B · Corner 6m×3m Pavilion (₹35,000)': {
        adjusters: [
          { name: '6m × 3m Prime Corner Two-Side-Open Pavilion', value: 35000 },
          { name: '4 Complimentary Exhibitor Badges Included', value: 0 },
        ],
      },
    },
  };
}

const server = http.createServer(async (req, res) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      });
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost:' + PORT}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Normalize trailing slash except for root
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    if (ROUTE_ALIASES[pathname]) {
      pathname = ROUTE_ALIASES[pathname];
    }

    // 1. Handle Contact Form POST endpoint locally
    if (req.method === 'POST' && pathname === '/api/forms/contact') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ ok: true, status: 'success' }));
      return;
    }

    // 1a. Handle SQLite + Razorpay + QR + Resend Backend API (/api/*)
    if (pathname.startsWith('/api/')) {
      const apiRouter = await getApiRouter();
      const handled = await apiRouter.handleApiRequest(req, res, parsedUrl);
      if (handled) return;
      res.writeHead(404, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ ok: false, error: `API endpoint not found: ${pathname}` }));
      return;
    }

    // 1b. Serve dedicated Portal HTML routes (/events, /pass, /check-in, /admin)
    if (PORTAL_HTML_ROUTES[pathname]) {
      const portalFile = path.join(ROOT_DIR, PORTAL_HTML_ROUTES[pathname]);
      if (await serveFile(req, res, portalFile, 'text/html; charset=utf-8', true)) {
        return;
      }
    }

    // 1b. Handle Next.js Server Actions (e.g. POST /pricer with Next-Action header)
    const nextAction = req.headers['next-action'];
    if (req.method === 'POST' && nextAction) {
      // Drain request body
      for await (const _chunk of req) {}
      const pricerPayload = buildPurpleFestPricerPayload();
      const flightBody = `0:["$@1",["xy4V3lk5CKCbT2XW2SSa-",null]]\n1:${JSON.stringify(pricerPayload)}\n`;
      const outBuf = Buffer.from(flightBody, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/x-component',
        'Content-Length': outBuf.length,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        'x-action-revalidated': '[[],0,1]',
        'Vary': 'RSC, Next-Router-State-Tree, Next-Router-Prefetch',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(outBuf);
      return;
    }

    // 2. Handle Next.js Image Optimization endpoint /_next/image?url=...
    if (pathname === '/_next/image') {
      const rawTarget = parsedUrl.searchParams.get('url');
      if (rawTarget) {
        let localRel = rawTarget;
        if (localRel.startsWith(CMS_ORIGIN)) {
          localRel = localRel.slice(CMS_ORIGIN.length);
        } else if (localRel.startsWith(UPSTREAM_ORIGIN)) {
          localRel = localRel.slice(UPSTREAM_ORIGIN.length);
        } else if (localRel.startsWith('https://battalion.com')) {
          localRel = localRel.slice('https://battalion.com'.length);
        }
        const safeRel = path.normalize(localRel).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]+/, '');
        const candidatePath = path.join(ROOT_DIR, safeRel);
        if (await serveFile(req, res, candidatePath)) return;
      }
    }

    // 3. Handle Next.js App Router RSC requests (header RSC: 1 or ?_rsc=...)
    const isRscRequest = req.headers['rsc'] === '1' || parsedUrl.searchParams.has('_rsc');
    if (isRscRequest) {
      const rscName = pathname === '/' ? 'index.rsc' : `${pathname.slice(1)}.rsc`;
      const rscPath = path.join(ROOT_DIR, '_rsc', rscName);
      if (await serveFile(req, res, rscPath, 'text/x-component', true)) {
        return;
      }
    }

    // 4. Resolve static file or HTML route from ROOT_DIR
    const safeRel = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]+/, '');

    if (pathname === '/') {
      const indexHtml = path.join(ROOT_DIR, 'index.html');
      if (await serveFile(req, res, indexHtml, 'text/html; charset=utf-8', true)) return;
    } else {
      // Exact file match (e.g., /_next/static/..., /sequence/..., /uploads/..., /robots.txt, /sitemap.xml)
      const exactPath = path.join(ROOT_DIR, safeRel);
      if (await serveFile(req, res, exactPath, null, true)) return;

      // Clean route match: /<route>.html
      const htmlPath = path.join(ROOT_DIR, `${safeRel}.html`);
      if (await serveFile(req, res, htmlPath, 'text/html; charset=utf-8', true)) return;

      // Directory index match: /<route>/index.html
      const dirIndexPath = path.join(ROOT_DIR, safeRel, 'index.html');
      if (await serveFile(req, res, dirIndexPath, 'text/html; charset=utf-8', true)) return;
    }

    // 5. Fallback: serve 404 status with index.html shell so Next.js renders NotFoundSection (/sequence/404/*)
    const fallbackHtml = path.join(ROOT_DIR, 'index.html');
    const stat = await fileExists(fallbackHtml);
    if (stat) {
      let text = await fsp.readFile(fallbackHtml, 'utf8');
      text = text.replace(/https:\/\/battalion-cms\.onrender\.com\/uploads\//g, '/uploads/');
      const buf = Buffer.from(text, 'utf8');
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': buf.length,
      });
      res.end(buf);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  } catch (err) {
    console.error('Server error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`PurpleFest Vadodara 2027 (Battalion Engine) Server running at http://localhost:${PORT}`);
});
