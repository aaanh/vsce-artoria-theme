const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = require(packageJsonPath);

const [, , flag] = process.argv;

if (!flag || !["--major", "--minor", "--patch"].includes(flag)) {
  console.error("Please provide one of: --major, --minor, or --patch");
  process.exit(1);
}

const [major, minor, patch] = packageJson.version.split(".").map(Number);

let newVersion;
switch (flag) {
  case "--major":
    newVersion = `${major + 1}.0.0`;
    break;
  case "--minor":
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case "--patch":
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

packageJson.version = newVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
console.log(`Version updated to ${newVersion}`);
