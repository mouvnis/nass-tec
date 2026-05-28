/**
 * NassTec Icon Generator
 * Generates the app icon in all required Android sizes
 * Uses sharp (built-in to node) or canvas library
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Android icon sizes
const SIZES = [
  { dir: 'mipmap-mdpi',    size: 48  },
  { dir: 'mipmap-hdpi',    size: 72  },
  { dir: 'mipmap-xhdpi',   size: 96  },
  { dir: 'mipmap-xxhdpi',  size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

// Also generate a 1024px icon for the Play Store
const ALL_SIZES = [...SIZES, { dir: 'store', size: 1024 }];

function drawNassTecIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const W = size;
  const s = W / 220; // scale factor (designed at 220px)

  // ── Background ──
  const bg = ctx.createRadialGradient(W/2, W*0.4, 0, W/2, W/2, W/2);
  bg.addColorStop(0, '#1e1800');
  bg.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, W, W, W * 0.18);
  ctx.fill();

  // ── Gold gradient ──
  function gold(x1,y1,x2,y2) {
    const g = ctx.createLinearGradient(x1,y1,x2,y2);
    g.addColorStop(0, '#F5D78E');
    g.addColorStop(0.45, '#C9A84C');
    g.addColorStop(1, '#9A7A32');
    return g;
  }

  // ── Outer ring ──
  ctx.strokeStyle = gold(0,0,W,W);
  ctx.lineWidth = s * 5;
  ctx.globalAlpha = 0.55;
  ctx.beginPath(); ctx.arc(W/2, W/2, W*0.44, 0, Math.PI*2); ctx.stroke();
  ctx.globalAlpha = 1;

  // ── Document top / camera cap ──
  ctx.fillStyle = gold(W*0.32, W*0.18, W*0.68, W*0.35);
  ctx.beginPath();
  ctx.moveTo(W*0.28, W*0.34);
  ctx.quadraticCurveTo(W*0.5, W*0.20, W*0.72, W*0.34);
  ctx.lineTo(W*0.74, W*0.39);
  ctx.lineTo(W*0.26, W*0.39);
  ctx.closePath();
  ctx.fill();

  // ── Document body ──
  ctx.fillStyle = gold(W*0.25, W*0.38, W*0.75, W*0.75);
  roundRect(ctx, W*0.255, W*0.385, W*0.49, W*0.34, s*9);
  ctx.fill();

  // ── Text lines ──
  ctx.fillStyle = '#0a0a0a';
  const lineY = [W*0.455, W*0.51, W*0.565, W*0.618];
  lineY.forEach((y, i) => {
    const lw = i === 3 ? W*0.24 : W*0.37;
    roundRect(ctx, W*0.315, y, lw, s*5, s*2.5);
    ctx.fill();
  });

  // ── Corner scan brackets ──
  ctx.strokeStyle = gold(0,0,W,W);
  ctx.lineWidth = s * 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const bSize = W * 0.1;
  const brackets = [
    [[W*0.22, W*0.42], [W*0.22, W*0.30], [W*0.30, W*0.30]],
    [[W*0.78, W*0.42], [W*0.78, W*0.30], [W*0.70, W*0.30]],
    [[W*0.22, W*0.70], [W*0.22, W*0.78], [W*0.30, W*0.78]],
    [[W*0.78, W*0.70], [W*0.78, W*0.78], [W*0.70, W*0.78]],
  ];
  brackets.forEach(pts => {
    ctx.beginPath();
    ctx.moveTo(...pts[0]); ctx.lineTo(...pts[1]); ctx.lineTo(...pts[2]);
    ctx.stroke();
  });

  // ── TTS wave (bottom) ──
  ctx.strokeStyle = gold(W*0.3, W*0.8, W*0.7, W*0.9);
  ctx.lineWidth = s * 3;
  ctx.fillStyle = 'none';
  // center dot
  ctx.beginPath(); ctx.arc(W*0.5, W*0.82, s*5, 0, Math.PI*2);
  ctx.fillStyle = gold(W*0.4,W*0.78,W*0.6,W*0.86); ctx.fill();
  // inner arc
  ctx.beginPath();
  ctx.arc(W*0.5, W*0.82, s*12, Math.PI*1.1, Math.PI*1.9, false);
  ctx.stroke();
  // outer arc  
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = s * 2;
  ctx.beginPath();
  ctx.arc(W*0.5, W*0.82, s*20, Math.PI*1.05, Math.PI*1.95, false);
  ctx.stroke();
  ctx.globalAlpha = 1;

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Generate icons for all sizes
let generated = 0;
for (const { dir, size } of ALL_SIZES) {
  const canvas = drawNassTecIcon(size);
  const buf = canvas.toBuffer('image/png');

  if (dir === 'store') {
    const outDir = 'icon-output';
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'icon-1024.png'), buf);
    console.log(`✅  Store icon: ${outDir}/icon-1024.png (${size}px)`);
  } else {
    const resDir = path.join('android', 'app', 'src', 'main', 'res', dir);
    if (fs.existsSync(resDir)) {
      fs.writeFileSync(path.join(resDir, 'ic_launcher.png'), buf);
      fs.writeFileSync(path.join(resDir, 'ic_launcher_round.png'), buf);
      console.log(`✅  ${dir}: ic_launcher.png (${size}px)`);
      generated++;
    } else {
      console.log(`⚠️   ${dir} not found, skipping`);
    }
  }
}

if (generated === 0) {
  console.log('⚠️  No Android res directories found — icon generation skipped.');
  console.log('    (This is normal if run before `npx cap add android`)');
} else {
  console.log(`\n🎨  Generated ${generated} icon sizes successfully!`);
}
