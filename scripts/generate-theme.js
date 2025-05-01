const fs = require("fs");
const path = require("path");

function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function replaceTemplateVariables(template, variables) {
  let result = JSON.stringify(template, null, 2);

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`"{{${key}}}"`, "g");
    result = result.replace(regex, `"${value}"`);
  }

  return JSON.parse(result);
}

function generateTheme(configPath) {
  const config = loadJSON(configPath);
  const base = loadJSON(path.join(__dirname, "../themes/base.json"));
  const colors = loadJSON(path.join(__dirname, "../themes/colors.json"));

  // Generate theme
  const theme = {
    name: config.name,
    colors: replaceTemplateVariables(colors.colors, config.colors),
    tokenColors: replaceTemplateVariables(base.tokenColors, config.tokens),
  };

  // Write theme file
  const themeName = path.basename(configPath, ".config.json");
  const outputPath = path.join(__dirname, `../themes/${themeName}-theme.json`);
  fs.writeFileSync(outputPath, JSON.stringify(theme, null, 2));
  console.log(`Generated theme: ${outputPath}`);
}

// Generate themes for all config files
const configDir = path.join(__dirname, "../themes");
const configFiles = fs
  .readdirSync(configDir)
  .filter((file) => file.endsWith(".config.json"));

for (const configFile of configFiles) {
  generateTheme(path.join(configDir, configFile));
}
