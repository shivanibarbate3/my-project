require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const dbUri = process.env.MONGO_URI; // your Atlas connection string
const dbName = "shivani_cms"; // change if needed
const dbJsonDir = path.join(__dirname, "dbjson"); // folder containing all .json files

// Helper function to deeply flatten nested arrays ([[{…}]])
const flatten = (arr) =>
  Array.isArray(arr)
    ? arr.reduce((a, v) => a.concat(flatten(v)), [])
    : [arr];

async function importData() {
  if (!dbUri) {
    console.error("❌ MONGO_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(dbUri, { dbName });
  console.log("✅ Connected to MongoDB Atlas");

  const files = fs.readdirSync(dbJsonDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(dbJsonDir, file);
    const collectionName = path.basename(file, ".json");

    try {
      let raw = fs.readFileSync(filePath, "utf8").trim();

      // Clean up Mongo shell syntax and whitespace
      raw = raw
        .replace(/ObjectId\("([0-9a-fA-F]+)"\)/g, '"$1"')
        .replace(/ISODate\("([^"]+)"\)/g, '"$1"')
        .replace(/NumberInt\(([^)]+)\)/g, '$1')
        .replace(/\r?\n|\r/g, "")
        .replace(/\t/g, " ")
        .trim();

      // Wrap single or consecutive objects into array
      if (!raw.startsWith("[")) {
        raw = `[${raw.replace(/}\s*{/g, "},{")}]`;
      }

      // Parse JSON safely
      const jsonData = JSON.parse(raw);

      // Flatten nested arrays [[[{...}]]]
      const docs = flatten(jsonData);

      console.log(`📦 Importing ${file} → ${collectionName} (${docs.length} records)`);

      const collection = mongoose.connection.collection(collectionName);
      await collection.deleteMany({});
      if (Array.isArray(docs) && docs.length) {
        await collection.insertMany(docs);
      } else if (docs && typeof docs === "object") {
        await collection.insertOne(docs);
      }
    } catch (err) {
      console.error(`⚠️ Error in ${file}: ${err.message}`);
    }
  }

  console.log("🎉 All JSON files processed!");
  await mongoose.disconnect();
}

importData().catch(err => {
  console.error("⚠️ Import error:", err);
  process.exit(1);
});