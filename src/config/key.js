const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const envPath = path.resolve(__dirname, "../../.env");

const newKey = crypto.randomBytes(32).toString("hex");
let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

if (envContent.includes("APP_KEY=")) {
  envContent = envContent.replace(/APP_KEY=.*/g, `APP_KEY="${newKey}"`);
} else {
  envContent += `\nAPP_KEY="${newKey}"\n`;
}
fs.writeFileSync(envPath, envContent, "utf-8");
console.log("APP_KEY Generated");