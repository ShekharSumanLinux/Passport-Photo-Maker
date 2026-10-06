const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const brainDir = 'C:/Users/Anonymous/.gemini/antigravity-ide/brain/c7b27537-653b-4bd6-89a7-b55106a91933';
const outDir = 'd:/AI Course/PhotoShop/public/samples';

async function run() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Colorize kid demo images (Color & B&W)
  const kidColorSrc = path.join(brainDir, 'colorize_demo_kid_1791042597426.jpg');
  await sharp(kidColorSrc)
    .resize(900, 900, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'colorize-demo-color.jpg'));
  console.log('Saved colorize-demo-color.jpg');

  await sharp(kidColorSrc)
    .resize(900, 900, { fit: 'cover' })
    .grayscale()
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'colorize-demo-bw.jpg'));
  console.log('Saved colorize-demo-bw.jpg');

  // 2. The 4 B&W samples from user's screenshot
  const samples = [
    { file: 'bw_vintage_lady_1791042663237.jpg', name: 'bw-sample-1-lady', label: 'Vintage Elegance (1940)' },
    { file: 'bw_sample_retro_street_1791042699351.jpg', name: 'bw-sample-2-street', label: 'Retro Street Style (1960)' },
    { file: 'bw_sample_classic_face_1791042739559.jpg', name: 'bw-sample-3-face', label: 'Classic Glamour Face (1950)' },
    { file: 'bw_sample_vintage_gentleman_1791042768297.jpg', name: 'bw-sample-4-gentleman', label: 'Vintage Gentleman (1950)' },
  ];

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const srcPath = path.join(brainDir, s.file);

    // Full 900x900 image
    await sharp(srcPath)
      .resize(900, 900, { fit: 'cover' })
      .grayscale()
      .jpeg({ quality: 88 })
      .toFile(path.join(outDir, `${s.name}.jpg`));

    // Thumbnail 120x120
    await sharp(srcPath)
      .resize(120, 120, { fit: 'cover' })
      .grayscale()
      .jpeg({ quality: 80 })
      .toFile(path.join(outDir, `bw-thumb-${i + 1}.jpg`));

    console.log(`Saved ${s.name}.jpg and bw-thumb-${i + 1}.jpg`);
  }

  console.log('All colorize demo and sample assets processed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
