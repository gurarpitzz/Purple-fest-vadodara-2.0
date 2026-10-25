import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT_DIR = 'd:/argon trial rea/purple fest vadodara';
const SEQ_DIR = path.join(ROOT_DIR, 'sequence');
const ORIG_SMILE_DIR = 'd:/argon trial rea/battalion-original/sequence/smile';
const LOGO_PATH = path.join(ROOT_DIR, 'purple_logo_transparent.png');
const SCRATCH_DIR = 'C:/Users/HP/.gemini/antigravity/brain/d343f1cc-c4f4-45c4-83b1-ae0e03c23077/scratch';

// Step 1: Populate 'smile' (38d/38m) and 'leaves' (41d/37m) with the exact original Battalion 3D Wink Emoji animation
function populateWinkEmojiSequences() {
  const targets = [
    { name: 'smile',  dFrames: 38, mFrames: 38 },
    { name: 'leaves', dFrames: 41, mFrames: 37 }
  ];
  let copied = 0;
  for (const tgt of targets) {
    for (let f = 1; f <= tgt.dFrames; f++) {
      const srcIdx = Math.min(38, Math.max(1, Math.round(1 + ((f - 1) / Math.max(1, tgt.dFrames - 1)) * 37)));
      const srcFile = path.join(ORIG_SMILE_DIR, 'desktop', String(srcIdx).padStart(5, '0') + '.jpg');
      const dstFile = path.join(SEQ_DIR, tgt.name, 'desktop', String(f).padStart(5, '0') + '.jpg');
      fs.mkdirSync(path.dirname(dstFile), { recursive: true });
      fs.copyFileSync(srcFile, dstFile);
      copied++;
    }
    for (let f = 1; f <= tgt.mFrames; f++) {
      const srcIdx = Math.min(38, Math.max(1, Math.round(1 + ((f - 1) / Math.max(1, tgt.mFrames - 1)) * 37)));
      const srcFile = path.join(ORIG_SMILE_DIR, 'mobile', String(srcIdx).padStart(5, '0') + '.jpg');
      const dstFile = path.join(SEQ_DIR, tgt.name, 'mobile', String(f).padStart(5, '0') + '.jpg');
      fs.mkdirSync(path.dirname(dstFile), { recursive: true });
      fs.copyFileSync(srcFile, dstFile);
      copied++;
    }
  }
  console.log(`Populated wink emoji animation into 'smile' and 'leaves' (${copied} files).`);
  return copied;
}

// Step 2: Pure 5-Stage 3D Pastel PurpleFest Logo (three people with hearts, ZERO overlapping shapes)
// 'hero' (1920x1040 / 960x520) is already generated cleanly; we render the 1728x1147 / 960x637 group + 404 (1728x810 / 960x450)
const STD_LOGO_SEQUENCES = [
  { name: 'dollar',           dFrames: 91, mFrames: 42 },
  { name: 'stacked-building', dFrames: 66, mFrames: 66 },
  { name: 'key',              dFrames: 65, mFrames: 65 },
  { name: 'careers',          dFrames: 40, mFrames: 40 },
  { name: 'contact',          dFrames: 60, mFrames: 60 },
  { name: 'tier',             dFrames: 65, mFrames: 65 },
  { name: 'tpo',              dFrames: 66, mFrames: 66 }
];

let totalSavedFiles = populateWinkEmojiSequences();
const startTime = Date.now();
let chromeProc = null;

const srv = http.createServer((req, res) => {
  if (req.url === '/logo.png') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(fs.readFileSync(LOGO_PATH));
  } else if (req.url === '/save-frame' && req.method === 'POST') {
    const chunks = [];
    req.on('data', d => chunks.push(d));
    req.on('end', () => {
      const item = JSON.parse(Buffer.concat(chunks).toString());
      const dBuf = Buffer.from(item.dUrl.split(',')[1], 'base64');
      const mBuf = Buffer.from(item.mUrl.split(',')[1], 'base64');
      if (item.kind === 'std') {
        const idx = item.index; // 0..90
        for (const seq of STD_LOGO_SEQUENCES) {
          for (let f = 1; f <= seq.dFrames; f++) {
            const mapped = Math.min(90, Math.max(0, Math.round(((f - 1) / Math.max(1, seq.dFrames - 1)) * 90)));
            if (mapped === idx) {
              const outPath = path.join(SEQ_DIR, seq.name, 'desktop', String(f).padStart(5, '0') + '.jpg');
              fs.mkdirSync(path.dirname(outPath), { recursive: true });
              fs.writeFileSync(outPath, dBuf);
              totalSavedFiles++;
            }
          }
          for (let f = 1; f <= seq.mFrames; f++) {
            const mapped = Math.min(90, Math.max(0, Math.round(((f - 1) / Math.max(1, seq.mFrames - 1)) * 90)));
            if (mapped === idx) {
              const outPath = path.join(SEQ_DIR, seq.name, 'mobile', String(f).padStart(5, '0') + '.jpg');
              fs.mkdirSync(path.dirname(outPath), { recursive: true });
              fs.writeFileSync(outPath, mBuf);
              totalSavedFiles++;
            }
          }
        }
      } else if (item.kind === '404') {
        const f = item.index + 1;
        const dPath = path.join(SEQ_DIR, '404', 'desktop', String(f).padStart(5, '0') + '.jpg');
        const mPath = path.join(SEQ_DIR, '404', 'mobile', String(f).padStart(5, '0') + '.jpg');
        fs.mkdirSync(path.dirname(dPath), { recursive: true });
        fs.mkdirSync(path.dirname(mPath), { recursive: true });
        fs.writeFileSync(dPath, dBuf);
        fs.writeFileSync(mPath, mBuf);
        totalSavedFiles += 2;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    });
  } else if (req.url === '/done' && req.method === 'POST') {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`=== COMPLETED ALL ${totalSavedFiles} UPDATED SEQUENCE FRAMES IN ${elapsed}s ===`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    setTimeout(() => {
      try { if (chromeProc) chromeProc.kill(); } catch {}
      process.exit(0);
    }, 100);
  } else if (req.url === '/error' && req.method === 'POST') {
    let b = '';
    req.on('data', d => b += d);
    req.on('end', () => {
      console.error('BROWSER ERROR:', b);
      res.end('ok');
      try { if (chromeProc) chromeProc.kill(); } catch {}
      process.exit(1);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><body><script>
      window.addEventListener('error', e => fetch('/error', { method: 'POST', body: e.message + ' @ ' + e.lineno }));
      window.addEventListener('unhandledrejection', e => fetch('/error', { method: 'POST', body: String(e.reason && e.reason.stack || e.reason) }));

      function extractContoursFromLogo(img) {
        const scale = 2;
        const W = 500 * scale;
        const H = 268 * scale;
        const c = document.createElement('canvas');
        c.width = W;
        c.height = H;
        const ctx = c.getContext('2d');
        ctx.filter = 'blur(2.8px)';
        ctx.drawImage(img, 0, 0, 500, 268, 0, 0, W, H);
        const imgData = ctx.getImageData(0, 0, W, H).data;
        const grid = new Float32Array(W * H);
        for (let i = 0; i < W * H; i++) grid[i] = imgData[i * 4 + 3] / 255.0;

        const thresh = 0.48;
        const segs = [];
        const interp = (v1, v2) => Math.abs(v2 - v1) < 1e-5 ? 0.5 : (thresh - v1) / (v2 - v1);

        for (let y = 0; y < H - 1; y++) {
          for (let x = 0; x < W - 1; x++) {
            const v0 = grid[y * W + x], v1 = grid[y * W + (x + 1)];
            const v2 = grid[(y + 1) * W + (x + 1)], v3 = grid[(y + 1) * W + x];
            const mask = (v0 >= thresh ? 1 : 0) | (v1 >= thresh ? 2 : 0) | (v2 >= thresh ? 4 : 0) | (v3 >= thresh ? 8 : 0);
            if (mask === 0 || mask === 15) continue;
            const pT = { x: x + interp(v0, v1), y: y };
            const pR = { x: x + 1, y: y + interp(v1, v2) };
            const pB = { x: x + interp(v3, v2), y: y + 1 };
            const pL = { x: x, y: y + interp(v0, v3) };
            switch (mask) {
              case 1: segs.push([pL, pT]); break;
              case 2: segs.push([pT, pR]); break;
              case 3: segs.push([pL, pR]); break;
              case 4: segs.push([pR, pB]); break;
              case 5: segs.push([pL, pB], [pR, pT]); break;
              case 6: segs.push([pT, pB]); break;
              case 7: segs.push([pL, pB]); break;
              case 8: segs.push([pB, pL]); break;
              case 9: segs.push([pB, pT]); break;
              case 10: segs.push([pT, pL], [pB, pR]); break;
              case 11: segs.push([pB, pR]); break;
              case 12: segs.push([pR, pL]); break;
              case 13: segs.push([pR, pT]); break;
              case 14: segs.push([pT, pL]); break;
            }
          }
        }

        const key = p => Math.round(p.x * 100) + ',' + Math.round(p.y * 100);
        const startMap = new Map();
        segs.forEach((s, idx) => {
          const k = key(s[0]);
          if (!startMap.has(k)) startMap.set(k, []);
          startMap.get(k).push(idx);
        });

        const used = new Uint8Array(segs.length);
        const rawLoops = [];
        for (let i = 0; i < segs.length; i++) {
          if (used[i]) continue;
          used[i] = 1;
          const loop = [segs[i][0], segs[i][1]];
          while (true) {
            const curr = loop[loop.length - 1];
            const candidates = startMap.get(key(curr));
            if (!candidates) break;
            let nextIdx = -1;
            for (const cIdx of candidates) {
              if (!used[cIdx]) { nextIdx = cIdx; break; }
            }
            if (nextIdx === -1) break;
            used[nextIdx] = 1;
            loop.push(segs[nextIdx][1]);
          }
          if (loop.length > 20) rawLoops.push(loop);
        }

        function smoothLoop(pts, iterations = 18) {
          let cur = pts.slice(0, pts.length - 1);
          const resample = (arr, step = 2.0) => {
            const out = [];
            const n = arr.length;
            for (let i = 0; i < n; i++) {
              const p1 = arr[i], p2 = arr[(i + 1) % n];
              const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
              out.push(p1);
              if (d > step * 1.5) {
                const steps = Math.floor(d / step);
                for (let k = 1; k < steps; k++) {
                  out.push({ x: p1.x + (p2.x - p1.x) * (k / steps), y: p1.y + (p2.y - p1.y) * (k / steps) });
                }
              }
            }
            return out;
          };
          cur = resample(cur, 2.2);
          const pass = (arr, w) => {
            const n = arr.length;
            const next = new Array(n);
            for (let i = 0; i < n; i++) {
              const prev = arr[(i - 1 + n) % n], p = arr[i], nxt = arr[(i + 1) % n];
              next[i] = {
                x: p.x + w * ((prev.x + nxt.x) * 0.5 - p.x),
                y: p.y + w * ((prev.y + nxt.y) * 0.5 - p.y)
              };
            }
            return next;
          };
          for (let it = 0; it < iterations; it++) {
            cur = pass(cur, 0.45);
            cur = pass(cur, -0.47);
          }
          return cur.map(p => ({ x: p.x / scale, y: p.y / scale }));
        }

        function signedArea(pts) {
          let a = 0;
          for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i], p2 = pts[(i + 1) % pts.length];
            a += (p1.x * p2.y - p2.x * p1.y);
          }
          return a * 0.5;
        }

        function bbox(pts) {
          let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
          for (const p of pts) {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
          }
          return { minX, minY, maxX, maxY, cx: (minX + maxX) * 0.5, cy: (minY + maxY) * 0.5 };
        }

        return rawLoops.map(l => {
          const pts = smoothLoop(l, 22);
          const area = signedArea(pts);
          const box = bbox(pts);
          return { pts, area, isHole: area < 0, box };
        });
      }

      function transformLoops(loops, sx, sy, dx, dy) {
        return loops.map(l => ({
          ...l,
          pts: l.pts.map(p => ({
            x: (p.x - 246) * sx + 246 + dx,
            y: (p.y - 132) * sy + 132 + dy
          }))
        }));
      }

      function clipPolygonCustom(pts, fnVal) {
        if (!pts || pts.length < 3) return [];
        const out = [];
        const n = pts.length;
        for (let i = 0; i < n; i++) {
          const cur = pts[i], prev = pts[(i - 1 + n) % n];
          const dCur = fnVal(cur), dPrev = fnVal(prev);
          if (dCur >= 0) {
            if (dPrev < 0) {
              const t = dPrev / (dPrev - dCur);
              out.push({ x: prev.x + t * (cur.x - prev.x), y: prev.y + t * (cur.y - prev.y) });
            }
            out.push(cur);
          } else if (dPrev >= 0) {
            const t = dPrev / (dPrev - dCur);
            out.push({ x: prev.x + t * (cur.x - prev.x), y: prev.y + t * (cur.y - prev.y) });
          }
        }
        return out;
      }

      function clipRibbonUnified(loops, leftReach, rightReach, yCenterMax, s3) {
        return loops.map(loop => {
          let pts = loop.pts;
          pts = clipPolygonCustom(pts, p => p.x - leftReach);
          pts = clipPolygonCustom(pts, p => rightReach - p.x);
          pts = clipPolygonCustom(pts, p => yCenterMax - p.y);
          if (s3 < 0.999) {
            pts = clipPolygonCustom(pts, p => {
              if (p.x >= 174 && p.x <= 323) return 100;
              if (p.x < 174) {
                const yLim = (176 - (p.x - 45) * 0.28) + s3 * 125;
                return yLim - p.y;
              } else {
                const yLim = (172 - (455 - p.x) * 0.28) + s3 * 125;
                return yLim - p.y;
              }
            });
          }
          return { ...loop, pts };
        }).filter(l => l.pts.length >= 3);
      }

      function renderScene(ctx, W, H, blocks, cam, bridgeCreases = []) {
        ctx.fillStyle = '#DDDDF9';
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        const cosA = Math.cos(cam.yaw), sinA = Math.sin(cam.yaw);
        const project = (lx, ly, lz) => {
          const x = (lx - 246) * cam.scale;
          const y = (ly - 132) * cam.scale;
          const rx = x * cosA - y * sinA;
          const ry = (x * sinA + y * cosA) * cam.pitch;
          return { x: cam.cx + rx, y: cam.cy + ry - lz * cam.scale };
        };

        const activeBlocks = blocks.filter(b => b.zTop > b.zBot + 0.2 && b.loops && b.loops.length > 0);

        // Soft floor contact ambient occlusion shadow (#5E5BB2 feathering into #DDDDF9)
        ctx.save();
        for (const pass of [
          { blur: 28 * (W / 1920), alpha: 0.22, dy: 13 * (W / 1920), dx: 3 * (W / 1920) },
          { blur: 10 * (W / 1920), alpha: 0.14, dy: 5 * (W / 1920), dx: 1 * (W / 1920) }
        ]) {
          ctx.filter = \`blur(\${Math.max(2, pass.blur)}px)\`;
          for (const blk of activeBlocks) {
            const hRatio = Math.min(1, (blk.zTop - blk.zBot) / 24);
            ctx.fillStyle = \`rgba(96, 93, 180, \${(pass.alpha * hRatio).toFixed(3)})\`;
            ctx.beginPath();
            for (const loop of blk.loops) {
              const pts = loop.pts;
              for (let i = 0; i < pts.length; i++) {
                const sp = project(pts[i].x, pts[i].y, 0);
                if (i === 0) ctx.moveTo(sp.x + pass.dx, sp.y + pass.dy);
                else ctx.lineTo(sp.x + pass.dx, sp.y + pass.dy);
              }
              ctx.closePath();
            }
            ctx.fill('evenodd');
          }
        }
        ctx.restore();

        const allQuads = [];
        for (const blk of activeBlocks) {
          for (const loop of blk.loops) {
            const pts = loop.pts, n = pts.length;
            if (n < 3) continue;
            let area = 0;
            for (let i = 0; i < n; i++) {
              const p = pts[i], q = pts[(i + 1) % n];
              area += (p.x * q.y - q.x * p.y);
            }
            const sign = (loop.isHole ? (area < 0 ? 1 : -1) : (area > 0 ? 1 : -1));
            const ordered = new Array(n);
            for (let i = 0; i < n; i++) ordered[i] = sign > 0 ? pts[i] : pts[(n - i) % n];

            const bPts = ordered.map(p => project(p.x, p.y, blk.zBot));
            const tPts = ordered.map(p => project(p.x, p.y, blk.zTop));
            const rawNormals = new Array(n);
            for (let i = 0; i < n; i++) {
              const b0 = bPts[i], b1 = bPts[(i + 1) % n];
              const dx = b1.x - b0.x, dy = b1.y - b0.y;
              const len = Math.hypot(dx, dy) || 1;
              rawNormals[i] = { nx: dy / len, ny: -dx / len, len };
            }

            const smoothNormals = new Array(n);
            for (let i = 0; i < n; i++) {
              let sx = 0, sy = 0;
              const n0 = rawNormals[i];
              for (let k = -4; k <= 4; k++) {
                const nk = rawNormals[((i + k) % n + n) % n];
                if (n0.nx * nk.nx + n0.ny * nk.ny > 0.85) {
                  const w = 5 - Math.abs(k);
                  sx += nk.nx * w;
                  sy += nk.ny * w;
                }
              }
              const slen = Math.hypot(sx, sy) || 1;
              smoothNormals[i] = { nx: sx / slen, ny: sy / slen };
            }

            for (let i = 0; i < n; i++) {
              const next = (i + 1) % n;
              const b0 = bPts[i], b1 = bPts[next], t0 = tPts[i], t1 = tPts[next];
              const len = rawNormals[i].len;
              if (len < 0.1) continue;
              const tx = (b1.x - b0.x) / len * 0.48, ty = (b1.y - b0.y) / len * 0.48;
              const { nx, ny } = smoothNormals[i];
              allQuads.push({
                b0: { x: b0.x - tx, y: b0.y - ty },
                b1: { x: b1.x + tx, y: b1.y + ty },
                t1: { x: t1.x + tx, y: t1.y + ty },
                t0: { x: t0.x - tx, y: t0.y - ty },
                nx, ny, depthY: (b0.y + b1.y) * 0.5, isHole: loop.isHole
              });
            }
          }
        }

        allQuads.sort((a, b) => a.depthY - b.depthY);

        for (const q of allQuads) {
          const leftWeight = Math.max(0, -q.nx * 0.85 + q.ny * 0.25);
          const rightShadow = Math.max(0, q.nx * 0.7 - q.ny * 0.3);

          let rTop = Math.round(146 + leftWeight * 38 - rightShadow * 15);
          let gTop = Math.round(146 + leftWeight * 39 - rightShadow * 15);
          let bTop = Math.round(208 + leftWeight * 22 - rightShadow * 11);

          let rBot = Math.round(120 + leftWeight * 46 - rightShadow * 10);
          let gBot = Math.round(120 + leftWeight * 47 - rightShadow * 10);
          let bBot = Math.round(194 + leftWeight * 27 - rightShadow * 8);

          if (q.isHole || q.ny < -0.15) {
            rTop = Math.round(rTop * 0.95);
            gTop = Math.round(gTop * 0.95);
            bTop = Math.round(bTop * 0.97);
          }

          const grad = ctx.createLinearGradient(0, q.t0.y, 0, q.b0.y);
          grad.addColorStop(0, \`rgb(\${rTop},\${gTop},\${bTop})\`);
          grad.addColorStop(1, \`rgb(\${rBot},\${gBot},\${bBot})\`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(q.b0.x, q.b0.y);
          ctx.lineTo(q.b1.x, q.b1.y);
          ctx.lineTo(q.t1.x, q.t1.y);
          ctx.lineTo(q.t0.x, q.t0.y);
          ctx.closePath();
          ctx.fill();
        }

        const topGrad = ctx.createLinearGradient(cam.cx - 350 * cam.scale, cam.cy - 200 * cam.scale, cam.cx + 350 * cam.scale, cam.cy + 200 * cam.scale);
        topGrad.addColorStop(0, '#DFDEFA');
        topGrad.addColorStop(0.5, '#D7D6F6');
        topGrad.addColorStop(1, '#D3D2F3');

        const sortedTop = activeBlocks.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
        for (const blk of sortedTop) {
          ctx.save();
          ctx.fillStyle = topGrad;
          ctx.beginPath();
          for (const loop of blk.loops) {
            const pts = loop.pts;
            for (let i = 0; i < pts.length; i++) {
              const sp = project(pts[i].x, pts[i].y, blk.zTop);
              if (i === 0) ctx.moveTo(sp.x, sp.y);
              else ctx.lineTo(sp.x, sp.y);
            }
            ctx.closePath();
          }
          ctx.fill('evenodd');

          ctx.strokeStyle = 'rgba(233, 232, 253, 0.9)';
          ctx.lineWidth = Math.max(0.9, 1.25 * (W / 1920));
          ctx.stroke();

          if (blk.hasCreases && bridgeCreases.length > 0) {
            ctx.clip('evenodd');
            for (const cr of bridgeCreases) {
              if (cr.alpha <= 0.01) continue;
              ctx.beginPath();
              for (let i = 0; i < cr.pts.length; i++) {
                const sp = project(cr.pts[i].x, cr.pts[i].y, blk.zTop);
                if (i === 0) ctx.moveTo(sp.x, sp.y);
                else ctx.lineTo(sp.x, sp.y);
              }
              ctx.strokeStyle = \`rgba(130, 130, 198, \${(0.55 * cr.alpha).toFixed(3)})\`;
              ctx.lineWidth = Math.max(1.2, 2.2 * (W / 1920));
              ctx.stroke();

              ctx.beginPath();
              for (let i = 0; i < cr.pts.length; i++) {
                const sp = project(cr.pts[i].x, cr.pts[i].y - 1.2, blk.zTop);
                if (i === 0) ctx.moveTo(sp.x, sp.y);
                else ctx.lineTo(sp.x, sp.y);
              }
              ctx.strokeStyle = \`rgba(238, 238, 255, \${(0.75 * cr.alpha).toFixed(3)})\`;
              ctx.lineWidth = Math.max(1.0, 1.5 * (W / 1920));
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        ctx.restore();
      }

      const img = new Image();
      img.onload = async () => {
        const allLoops = extractContoursFromLogo(img);
        const leftHeartBase = transformLoops(allLoops.filter(l => l.box.maxY < 112 && l.box.cx < 140), 1, 1, -2, -18);
        const centerHeartBase = transformLoops(allLoops.filter(l => l.box.maxY < 85 && l.box.cx >= 180 && l.box.cx <= 330), 1, 1, 0, -20);
        const rightHeartBase = transformLoops(allLoops.filter(l => l.box.maxY < 112 && l.box.cx > 360), 1, 1, 2, -18);
        const mainRibbonBase = allLoops.filter(l => l.box.maxY >= 112 || (l.box.maxY >= 85 && l.box.cx >= 140 && l.box.cx <= 360));

        const baseCreases = [
          [{ x: 232, y: 92 }, { x: 247, y: 101 }, { x: 261, y: 112 }],
          [{ x: 246, y: 78 }, { x: 261, y: 86 }, { x: 276, y: 97 }],
          [{ x: 84, y: 132 }, { x: 96, y: 138 }, { x: 109, y: 146 }],
          [{ x: 398, y: 127 }, { x: 412, y: 118 }, { x: 425, y: 111 }]
        ];

        const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);

        // Pure 5-stage PurpleFest Vadodara logo (ONLY the three people with hearts, ZERO extra overlapping shapes)
        function buildEmblem5Stage(progress, sx = 1, sy = 1, dx = 0, dy = 0, H = 25) {
          const s1 = ease((progress - 0.01) / 0.19);
          const s2 = ease((progress - 0.20) / 0.20);
          const s3 = ease((progress - 0.40) / 0.20);
          const s4 = ease((progress - 0.60) / 0.20);
          const s5 = ease((progress - 0.80) / 0.20);

          const blocks = [];
          const hFinal = H * (1 + 0.06 * s5);

          if (s1 > 0.005) {
            const leftReach = 174 - s2 * 174;
            const rightReach = 323 + s2 * 177;
            const yCenterMax = 80 + s1 * 190;
            const clippedRibbon = (s1 >= 0.999 && s2 >= 0.999 && s3 >= 0.999)
              ? mainRibbonBase
              : clipRibbonUnified(mainRibbonBase, leftReach, rightReach, yCenterMax, s3);
            const hRibbon = hFinal * Math.min(1, s1 * 1.25);
            blocks.push({
              loops: transformLoops(clippedRibbon, sx, sy, dx, dy),
              zBot: 0,
              zTop: hRibbon,
              order: 20,
              hasCreases: true
            });
          }

          if (s4 > 0.01) {
            const hCenter = hFinal * 1.04 * ease(Math.min(1, s4 * 1.25));
            const hSides = hFinal * 1.02 * ease(Math.max(0, (s4 - 0.12) / 0.88));
            if (hCenter > 0.5) {
              blocks.push({
                loops: transformLoops(centerHeartBase, sx, sy, dx, dy),
                zBot: 0, zTop: hCenter, order: 10
              });
            }
            if (hSides > 0.5) {
              blocks.push({
                loops: transformLoops(leftHeartBase, sx, sy, dx, dy),
                zBot: 0, zTop: hSides, order: 11
              });
              blocks.push({
                loops: transformLoops(rightHeartBase, sx, sy, dx, dy),
                zBot: 0, zTop: hSides, order: 12
              });
            }
          }

          const creases = baseCreases.map(pts => ({
            pts: pts.map(p => ({
              x: (p.x - 246) * sx + 246 + dx,
              y: (p.y - 132) * sy + 132 + dy
            })),
            alpha: Math.max(0.35 * s2, s5)
          }));

          return { blocks, creases };
        }

        const dCanvas = document.createElement('canvas');
        const dCtx = dCanvas.getContext('2d');
        const mCanvas = document.createElement('canvas');
        const mCtx = mCanvas.getContext('2d');

        // 1. Render 91 master frames for standard 1728x1147 / 960x637 pure 3D PurpleFest Logo sequences
        dCanvas.width = 1728; dCanvas.height = 1147;
        mCanvas.width = 960;  mCanvas.height = 637;
        const stdDesktop = [];
        const stdMobile = [];
        const camStd = { cx: 1728 * 0.5, cy: 1147 * 0.535, scale: 2.15, yaw: -0.10, pitch: 0.70 };

        for (let i = 0; i < 91; i++) {
          const t = i / 90;
          const progress = Math.min(1.0, 0.18 + (t / 0.88) * 0.82);
          const emb = buildEmblem5Stage(progress, 1, 1, 0, 10, 25);
          renderScene(dCtx, 1728, 1147, emb.blocks, camStd, emb.creases);
          mCtx.drawImage(dCanvas, 0, 0, 960, 637);
          await fetch('/save-frame', {
            method: 'POST',
            body: JSON.stringify({
              kind: 'std',
              index: i,
              dUrl: dCanvas.toDataURL('image/jpeg', 0.92),
              mUrl: mCanvas.toDataURL('image/jpeg', 0.90)
            })
          });
        }

        // 2. Render 64 frames for 404 (1728x810 / 960x450) pure 3D PurpleFest Logo
        dCanvas.width = 1728; dCanvas.height = 810;
        mCanvas.width = 960;  mCanvas.height = 450;
        const cam404 = { cx: 1728 * 0.5, cy: 810 * 0.54, scale: 1.85, yaw: -0.10, pitch: 0.70 };

        for (let i = 0; i < 64; i++) {
          const t = i / 63;
          const progress = Math.min(1.0, 0.18 + (t / 0.88) * 0.82);
          const emb = buildEmblem5Stage(progress, 1, 1, 0, 10, 25);
          renderScene(dCtx, 1728, 810, emb.blocks, cam404, emb.creases);
          mCtx.drawImage(dCanvas, 0, 0, 960, 450);
          await fetch('/save-frame', {
            method: 'POST',
            body: JSON.stringify({
              kind: '404',
              index: i,
              dUrl: dCanvas.toDataURL('image/jpeg', 0.92),
              mUrl: mCanvas.toDataURL('image/jpeg', 0.90)
            })
          });
        }

        await fetch('/done', { method: 'POST' });
      };
      img.src = '/logo.png';
    </script></body></html>`);
  }
}).listen(0, '127.0.0.1', () => {
  const port = srv.address().port;
  const profileDir = path.join(SCRATCH_DIR, 'chrome_seq_gen_' + port);
  fs.mkdirSync(profileDir, { recursive: true });
  console.log(`Starting headless Chromium 3D Isometric Sequence Generator on http://127.0.0.1:${port} ...`);
  chromeProc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0', `--user-data-dir=${profileDir}`, `http://127.0.0.1:${port}`
  ]);
});
