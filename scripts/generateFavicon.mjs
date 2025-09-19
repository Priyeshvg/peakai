import sharp from 'sharp';
import fs from 'fs';

// Create a simple PeakAI favicon with lightning bolt
const createFavicon = async () => {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3B82F6"/>
          <stop offset="0.5" stop-color="#1D4ED8"/>
          <stop offset="1" stop-color="#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
      <path d="M18 6L8 16h6l-2 10 10-10h-6l2-10z" fill="white"/>
    </svg>
  `;

  try {
    // Generate ICO file from SVG
    await sharp(Buffer.from(svg))
      .resize(32, 32)
      .png()
      .toFile('public/favicon-32.png');

    await sharp(Buffer.from(svg))
      .resize(16, 16)
      .png()
      .toFile('public/favicon-16.png');

    // Create favicon.ico by copying the 32px PNG (browsers will handle it)
    fs.copyFileSync('public/favicon-32.png', 'public/favicon.ico');

    console.log('✅ PeakAI favicon generated successfully!');
    
    // Clean up temp files
    fs.unlinkSync('public/favicon-32.png');
    fs.unlinkSync('public/favicon-16.png');
    
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
};

createFavicon();