const fs = require("fs");

// Path to your CSS file
const cssFilePath = "./css/flexistyles.css";

// Read the CSS file synchronously
try {
  const cssText = fs.readFileSync(cssFilePath, "utf8");
  const classes = extractCSSClasses(cssText);
  classes.sort((a, b) => a.className.localeCompare(b.className));
  const markdownTable = generateMarkdownTable(classes);

  // Write the Markdown table to the output file
  fs.writeFileSync("./list-of-classes.md", markdownTable, "utf8");

  console.log(`Markdown table written to ${outputFilePath}`);
} catch (error) {
  console.error("Error reading CSS file:", error.message);
}

function extractCSSClasses(cssText) {
  const classes = [];

  // Regular expression to match CSS class names and their properties
  const classRegex = /\.([^\s{]+)\s*{([^}]*)}/g;

  let match;
  while ((match = classRegex.exec(cssText)) !== null) {
    const className = match[1].trim();
    const classProperties = match[2]
      .split(";")
      .map((property) => property.trim())
      .filter(Boolean);

    classes.push({
      className: className,
      content: classProperties,
    });
  }

  return classes;
}

function generateMarkdownTable(classes) {
  let markdownTable = "| Class Name | Class Contents |\n";
  markdownTable += "|------------|----------------|\n";

  for (const classData of classes) {
    const className = classData.className;
    const classContents = classData.content.join("<br>");

    markdownTable += `| ${className} | ${classContents} |\n`;
  }

  return markdownTable;
}
