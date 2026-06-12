import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(workspaceRoot, 'assets');

// Same parsing logic as src/components/DocxParser.jsx -> parseDocxText
function parseDocxText(text, fallbackName) {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  let brand = "";
  let model = "";
  let name = "";

  const overview = [];
  const specs = []; // array of { label, value }
  const features = [];
  const applications = [];
  const compliance = [];
  const notes = [];

  let currentSection = "overview"; // default section

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check for Brand/Model/Name key-value pairs at the beginning (first 10 lines)
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0 && i < 10) {
      const label = line.substring(0, colonIndex).trim().toLowerCase();
      const val = line.substring(colonIndex + 1).trim();
      if (label === "brand") {
        brand = val;
        continue;
      }
      if (label === "model") {
        model = val;
        continue;
      }
      if (label === "name") {
        name = val;
        continue;
      }
    }

    // Section header detection
    if (
      lowerLine === "description" ||
      lowerLine === "overview" ||
      lowerLine === "device overview"
    ) {
      currentSection = "overview";
      continue;
    }
    if (
      lowerLine === "features" ||
      lowerLine === "product features" ||
      lowerLine === "key features" ||
      lowerLine === "features:"
    ) {
      currentSection = "features";
      continue;
    }
    if (
      lowerLine === "technical details" ||
      lowerLine === "specifications" ||
      lowerLine === "technical specifications" ||
      lowerLine === "specs" ||
      lowerLine === "configuration:" ||
      lowerLine === "configuration"
    ) {
      currentSection = "specs";
      continue;
    }
    if (
      lowerLine === "applications" ||
      lowerLine === "applications:" ||
      lowerLine === "uses"
    ) {
      currentSection = "applications";
      continue;
    }
    if (
      lowerLine === "compliance" ||
      lowerLine === "compliance:" ||
      lowerLine === "regulatory"
    ) {
      currentSection = "compliance";
      continue;
    }
    if (
      lowerLine === "optional" ||
      lowerLine === "optional:" ||
      lowerLine === "notes" ||
      lowerLine === "notes:" ||
      lowerLine === "additional notes"
    ) {
      currentSection = "notes";
      continue;
    }

    // Specification detection (Label : Value)
    if (colonIndex > 0) {
      const label = line.substring(0, colonIndex).trim();
      const val = line.substring(colonIndex + 1).trim();
      const cleanLabel = label.replace(/^[-*•\s\t]+/, "");

      // If it looks like a short label and has a value, save it as a spec
      if (val && cleanLabel.length < 50) {
        specs.push({ label: cleanLabel, value: val });
        continue;
      }
    }

    // Accumulate lines into appropriate section arrays
    const cleanText = line.replace(/^[-*•\s\t]+/, "");
    if (currentSection === "features") {
      features.push(cleanText);
    } else if (currentSection === "applications") {
      applications.push(cleanText);
    } else if (currentSection === "compliance") {
      compliance.push(cleanText);
    } else if (currentSection === "notes") {
      notes.push(cleanText);
    } else if (currentSection === "specs") {
      specs.push({ label: cleanText, value: "Yes" });
    } else {
      overview.push(line);
    }
  }

  // Construct Device Name
  let detectedName = "";
  if (brand && model) {
    detectedName = `${brand} - ${model}`;
  } else if (model) {
    detectedName = model;
  } else if (name) {
    detectedName = name;
  } else {
    // Check if the first line is a valid short title candidate
    if (lines.length > 0 && !lines[0].includes(":") && lines[0].length < 60) {
      detectedName = lines[0];
    } else {
      detectedName = fallbackName;
    }
  }

  return {
    deviceName: detectedName,
    overview: overview.join(" "),
    specs,
    features,
    applications,
    compliance,
    notes
  };
}

// Recursively find all files in a directory
function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

async function run() {
  console.log(`Scanning assets directory: ${assetsDir}`);
  const allFiles = getFiles(assetsDir);
  const docxFiles = allFiles.filter(f => f.endsWith('.docx'));

  console.log(`Found ${docxFiles.length} DOCX files to process.`);

  let successCount = 0;
  for (const docxPath of docxFiles) {
    const relativePath = path.relative(workspaceRoot, docxPath);
    const dir = path.dirname(docxPath);
    const ext = path.extname(docxPath);
    const baseName = path.basename(docxPath, ext);
    const jsonPath = path.join(dir, `${baseName}.json`);

    try {
      const result = await mammoth.extractRawText({ path: docxPath });
      const parsed = parseDocxText(result.value, baseName);
      
      fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, 2), 'utf-8');
      successCount++;
      console.log(`Successfully parsed: ${relativePath} -> ${baseName}.json`);
    } catch (err) {
      console.error(`Error parsing ${relativePath}:`, err);
    }
  }

  console.log(`Finished pre-parsing. Success rate: ${successCount}/${docxFiles.length}`);
}

run();
