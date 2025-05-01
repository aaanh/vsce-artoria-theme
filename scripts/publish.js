const fs = require("fs");
const path = require("path");
const { execSync, spawnSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkVsce = () => {
  try {
    execSync("vsce --version", { stdio: "ignore" });
    return true;
  } catch {
    console.log("vsce not found. Installing @vscode/vsce...");
    try {
      execSync("npm install -g @vscode/vsce", { stdio: "inherit" });
      return true;
    } catch (error) {
      console.error(
        "Failed to install vsce. Please install it manually with: npm install -g @vscode/vsce"
      );
      return false;
    }
  }
};

if (!checkVsce()) {
  rl.close();
  process.exit(1);
}

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = require(packageJsonPath);

// Store the original version
const originalVersion = packageJson.version;
const [major, minor, patch] = originalVersion.split(".").map(Number);

const question = `Current version: ${originalVersion}
Choose version update type:
1) major (${major + 1}.0.0)
2) minor (${major}.${minor + 1}.0)
3) patch (${major}.${minor}.${patch + 1})
4) manual (enter version manually)
5) keep current (${originalVersion})
Enter choice (1-5): `;

const validateSemver = (version) => {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
};

const promptForManualVersion = () => {
  return new Promise((resolve) => {
    rl.question("Enter version (x.y.z format): ", (version) => {
      if (!validateSemver(version)) {
        console.error("Invalid version format. Must be in x.y.z format");
        rl.close();
        process.exit(1);
      }
      resolve(version);
    });
  });
};

const updateAndPublish = async (answer) => {
  let newVersion;
  switch (answer.trim()) {
    case "1":
      newVersion = `${major + 1}.0.0`;
      break;
    case "2":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "3":
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case "4":
      newVersion = await promptForManualVersion();
      break;
    case "5":
      newVersion = originalVersion;
      break;
    default:
      console.error("Invalid choice. Please enter 1-5");
      rl.close();
      process.exit(1);
  }

  if (newVersion !== originalVersion) {
    packageJson.version = newVersion;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    );
    console.log(`Version updated to ${newVersion}`);
  } else {
    console.log("Keeping current version:", originalVersion);
  }

  try {
    console.log("Publishing extension...");
    execSync("vsce publish", { stdio: "inherit" });
    console.log("Successfully published!");
    rl.close();
  } catch (error) {
    console.error("Publishing failed, rolling back version...");
    if (newVersion !== originalVersion) {
      packageJson.version = originalVersion;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + "\n"
      );
      console.log(`Version rolled back to ${originalVersion}`);
    }
    rl.close();
    process.exit(1);
  }
};

rl.question(question, (answer) => {
  updateAndPublish(answer);
});
