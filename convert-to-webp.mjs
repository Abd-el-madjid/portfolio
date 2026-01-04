import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source folder (script at same level as 'src/')
const srcFolder = path.resolve(__dirname, "src/app/assets").replace(/\\/g, "/");
const quality = 80; // WebP quality 0-100

console.log("🗂️ Source Folder:", srcFolder);

async function convertImages() {
  try {
    // Case-insensitive glob for Windows
    const files = await glob(`${srcFolder}/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}`, {
      nocase: true,
    });

    console.log(`Found ${files.length} images. Converting to WebP...`);

    for (const file of files) {
      const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

      try {
        await sharp(file).webp({ quality }).toFile(outputFile);

        console.log(`✅ Converted: ${file} → ${outputFile}`);

        // Delete original
        fs.unlinkSync(file);
        console.log(`🗑️ Deleted original: ${file}`);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err);
      }
    }

    console.log("🎉 All images processed!");
  } catch (err) {
    console.error("Error scanning images:", err);
  }
}

// Run the script
convertImages();
