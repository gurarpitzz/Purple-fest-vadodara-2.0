import crypto from 'node:crypto';

const QR_SECRET = process.env.QR_HMAC_SECRET || 'pfv27_royal_gaekwad_hmac_secret_2027';

export function signQrToken(registration_id) {
  const cleanId = String(registration_id || '').trim();
  const hmac16 = crypto
    .createHmac('sha256', QR_SECRET)
    .update(`PFV27|${cleanId}`)
    .digest('hex')
    .slice(0, 16)
    .toUpperCase();
  return `PFV27.${cleanId}.${hmac16}`;
}

export function verifyQrTokenSignature(qr_token) {
  if (!qr_token || typeof qr_token !== 'string') {
    return { valid: false, registration_id: null };
  }
  const trimmed = qr_token.trim();
  if (!trimmed.startsWith('PFV27.')) {
    return { valid: false, registration_id: trimmed };
  }
  const parts = trimmed.split('.');
  if (parts.length < 3) {
    return { valid: false, registration_id: parts[1] || null };
  }
  const registration_id = parts[1];
  const expectedToken = signQrToken(registration_id);
  const valid = expectedToken.toUpperCase() === trimmed.toUpperCase();
  return { valid, registration_id };
}

// ============================================================================
// ISO/IEC 18004 Standard QR Code Matrix Encoder (Versions 1–10, Level L, Byte Mode)
// ============================================================================

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGeneratorPoly(degree) {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    const factor = GF_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], factor);
    }
    poly = next;
  }
  return poly;
}

function rsEncode(dataBytes, ecLen) {
  const gen = rsGeneratorPoly(ecLen);
  const rem = new Uint8Array(ecLen);
  for (let i = 0; i < dataBytes.length; i++) {
    const factor = dataBytes[i] ^ rem[0];
    rem.copyWithin(0, 1);
    rem[ecLen - 1] = 0;
    if (factor !== 0) {
      for (let j = 0; j < ecLen; j++) {
        rem[j] ^= gfMul(gen[j + 1], factor);
      }
    }
  }
  return rem;
}

// Version 1..10 Level L parameters:
// [totalDataBytes, ecBytesPerBlock, numBlocksGroup1, dataBytesGroup1, numBlocksGroup2, dataBytesGroup2, alignmentCoords]
const VERSION_TABLE_L = [
  null,
  { totalData: 19, ecLen: 7, g1Blocks: 1, g1Data: 19, g2Blocks: 0, g2Data: 0, align: [] },
  { totalData: 34, ecLen: 10, g1Blocks: 1, g1Data: 34, g2Blocks: 0, g2Data: 0, align: [6, 18] },
  { totalData: 55, ecLen: 15, g1Blocks: 1, g1Data: 55, g2Blocks: 0, g2Data: 0, align: [6, 22] },
  { totalData: 80, ecLen: 20, g1Blocks: 1, g1Data: 80, g2Blocks: 0, g2Data: 0, align: [6, 26] },
  { totalData: 108, ecLen: 26, g1Blocks: 1, g1Data: 108, g2Blocks: 0, g2Data: 0, align: [6, 30] },
  { totalData: 136, ecLen: 18, g1Blocks: 2, g1Data: 68, g2Blocks: 0, g2Data: 0, align: [6, 34] },
  { totalData: 156, ecLen: 20, g1Blocks: 2, g1Data: 78, g2Blocks: 0, g2Data: 0, align: [6, 22, 38] },
  { totalData: 192, ecLen: 24, g1Blocks: 2, g1Data: 96, g2Blocks: 0, g2Data: 0, align: [6, 24, 42] },
  { totalData: 232, ecLen: 30, g1Blocks: 2, g1Data: 116, g2Blocks: 0, g2Data: 0, align: [6, 26, 46] },
  { totalData: 271, ecLen: 18, g1Blocks: 2, g1Data: 68, g2Blocks: 2, g2Data: 69, align: [6, 28, 50] },
];

function selectVersion(byteLength) {
  for (let v = 1; v <= 10; v++) {
    const countBits = v <= 9 ? 8 : 16;
    const capacityBits = VERSION_TABLE_L[v].totalData * 8;
    const neededBits = 4 + countBits + byteLength * 8;
    if (neededBits <= capacityBits) return v;
  }
  return 10;
}

function buildCodewords(utf8Bytes, version) {
  const spec = VERSION_TABLE_L[version];
  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >>> i) & 1);
    }
  };

  // Byte mode indicator (0100)
  pushBits(0b0100, 4);
  const countBits = version <= 9 ? 8 : 16;
  pushBits(utf8Bytes.length, countBits);
  for (const b of utf8Bytes) {
    pushBits(b, 8);
  }

  const maxBits = spec.totalData * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  pushBits(0, termLen);

  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const dataBytes = new Uint8Array(spec.totalData);
  const byteLen = bits.length / 8;
  for (let i = 0; i < byteLen; i++) {
    let b = 0;
    for (let j = 0; j < 8; j++) {
      b = (b << 1) | bits[i * 8 + j];
    }
    dataBytes[i] = b;
  }

  let padToggle = true;
  for (let i = byteLen; i < spec.totalData; i++) {
    dataBytes[i] = padToggle ? 0xec : 0x11;
    padToggle = !padToggle;
  }

  // Split into blocks and compute RS ECC
  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (let i = 0; i < spec.g1Blocks; i++) {
    const block = dataBytes.subarray(offset, offset + spec.g1Data);
    offset += spec.g1Data;
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, spec.ecLen));
  }
  for (let i = 0; i < spec.g2Blocks; i++) {
    const block = dataBytes.subarray(offset, offset + spec.g2Data);
    offset += spec.g2Data;
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, spec.ecLen));
  }

  const interleaved = [];
  const maxDataLen = Math.max(spec.g1Data, spec.g2Data);
  for (let i = 0; i < maxDataLen; i++) {
    for (const b of dataBlocks) {
      if (i < b.length) interleaved.push(b[i]);
    }
  }
  for (let i = 0; i < spec.ecLen; i++) {
    for (const e of ecBlocks) {
      interleaved.push(e[i]);
    }
  }
  return interleaved;
}

function createQrMatrix(text) {
  let utf8 = Buffer.from(String(text), 'utf8');
  if (utf8.length > 268) {
    utf8 = utf8.subarray(0, 268);
  }
  const version = selectVersion(utf8.length);
  const spec = VERSION_TABLE_L[version];
  const size = 17 + version * 4;

  const modules = Array.from({ length: size }, () => new Uint8Array(size));
  const isFunc = Array.from({ length: size }, () => new Uint8Array(size));

  const setFunctionModule = (r, c, dark) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      modules[r][c] = dark ? 1 : 0;
      isFunc[r][c] = 1;
    }
  };

  // Finder pattern (7x7 + separator)
  const drawFinder = (topR, leftC) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const r = topR + dr;
        const c = leftC + dc;
        if (r < 0 || r >= size || c < 0 || c >= size) continue;
        const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
        const onOuterBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inCenter = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        setFunctionModule(r, c, inOuter && (onOuterBorder || inCenter));
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    setFunctionModule(6, i, i % 2 === 0);
    setFunctionModule(i, 6, i % 2 === 0);
  }

  // Alignment patterns
  const align = spec.align;
  for (let i = 0; i < align.length; i++) {
    for (let j = 0; j < align.length; j++) {
      if (
        (i === 0 && j === 0) ||
        (i === 0 && j === align.length - 1) ||
        (i === align.length - 1 && j === 0)
      ) {
        continue;
      }
      const cr = align[i];
      const cc = align[j];
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          setFunctionModule(cr + dr, cc + dc, dark);
        }
      }
    }
  }

  // Reserve format info areas & dark module
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) {
      isFunc[8][i] = 1;
      isFunc[i][8] = 1;
    }
  }
  for (let i = 0; i < 8; i++) {
    isFunc[8][size - 1 - i] = 1;
    isFunc[size - 1 - i][8] = 1;
  }
  setFunctionModule(size - 8, 8, true);

  // Version 7+ version info areas
  if (version >= 7) {
    let rem = version;
    for (let i = 0; i < 12; i++) {
      rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    }
    const verBits = (version << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const bit = ((verBits >>> i) & 1) !== 0;
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      setFunctionModule(a, b, bit);
      setFunctionModule(b, a, bit);
    }
  }

  // Place codewords in zig-zag order
  const codewords = buildCodewords(utf8, version);
  const allBits = [];
  for (const cw of codewords) {
    for (let i = 7; i >= 0; i--) {
      allBits.push((cw >>> i) & 1);
    }
  }

  let bitIdx = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      const r = upward ? size - 1 - vert : vert;
      for (let j = 0; j < 2; j++) {
        const c = right - j;
        if (!isFunc[r][c]) {
          modules[r][c] = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
        }
      }
    }
    upward = !upward;
  }

  // Apply Mask 0: (r + c) % 2 === 0
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isFunc[r][c] && (r + c) % 2 === 0) {
        modules[r][c] ^= 1;
      }
    }
  }

  // Write Format Information for Level L (01) + Mask 0 (000) -> data = 0b01000
  const formatData = (0b01 << 3) | 0b000;
  let rem = formatData;
  for (let i = 0; i < 10; i++) {
    rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  }
  const formatBits = ((formatData << 10) | rem) ^ 0x5412;

  for (let i = 0; i <= 5; i++) setFunctionModule(8, i, ((formatBits >>> i) & 1) !== 0);
  setFunctionModule(8, 7, ((formatBits >>> 6) & 1) !== 0);
  setFunctionModule(8, 8, ((formatBits >>> 7) & 1) !== 0);
  setFunctionModule(7, 8, ((formatBits >>> 8) & 1) !== 0);
  for (let i = 9; i < 15; i++) setFunctionModule(14 - i, 8, ((formatBits >>> i) & 1) !== 0);

  for (let i = 0; i < 8; i++) setFunctionModule(size - 1 - i, 8, ((formatBits >>> i) & 1) !== 0);
  for (let i = 8; i < 15; i++) setFunctionModule(8, size - 15 + i, ((formatBits >>> i) & 1) !== 0);

  return { size, modules, version };
}

export function renderQrSvg(payloadText, options = {}) {
  const { size, modules } = createQrMatrix(payloadText);
  const quietZone = 4;
  const totalModules = size + quietZone * 2;
  const pixelSize = options.pixelSize || 320;
  const fgColor = options.fgColor || '#202D59';
  const accentColor = options.accentColor || '#430C65';
  const bgColor = options.bgColor || '#FFFFFF';

  const pathParts = [];
  const finderParts = [];

  const isInFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) {
        const x = c + quietZone;
        const y = r + quietZone;
        if (isInFinder(r, c)) {
          finderParts.push(`M${x},${y}h1v1h-1z`);
        } else {
          pathParts.push(`M${x},${y}h1v1h-1z`);
        }
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalModules} ${totalModules}" width="${pixelSize}" height="${pixelSize}" shape-rendering="crispEdges" role="img" aria-label="Purple Fest Vadodara 2027 Official Entry Pass QR Code">
  <rect width="100%" height="100%" fill="${bgColor}" rx="1.5"/>
  <path d="${pathParts.join('')}" fill="${fgColor}"/>
  <path d="${finderParts.join('')}" fill="${accentColor}"/>
</svg>`;
}

export function generateRegistrationQR({
  registration_id,
  full_name = '',
  event_slug = '',
  amount_inr = 0,
  payment_status = 'PAID',
}) {
  const qr_token = signQrToken(registration_id);
  const qr_payload = {
    v: 'PFV27',
    id: registration_id,
    token: qr_token,
    name: full_name,
    event: event_slug,
    amt: Number(amount_inr || 0),
    status: payment_status,
  };
  const qr_payload_json = JSON.stringify(qr_payload);
  // Encode the signed token directly so both optical smartphone scanners and desk scanners read it instantaneously
  const qr_svg = renderQrSvg(qr_token, {
    pixelSize: 320,
    fgColor: '#1B254B',
    accentColor: '#430C65',
    bgColor: '#FFFFFF',
  });
  const qr_data_uri = `data:image/svg+xml;base64,${Buffer.from(qr_svg, 'utf8').toString('base64')}`;

  return {
    qr_token,
    qr_payload_json,
    qr_svg,
    qr_data_uri,
  };
}
