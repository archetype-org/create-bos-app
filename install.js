#!/usr/bin/env node

const path = require("path");
const fs = require("fs").promises;
const mvdir = require("mvdir");
const prompts = require("prompts");
const replace = require("replace-in-file");
const slugify = require("slugify");

main();

async function main() {
  const ts = Boolean(process.argv.includes("--typescript"));
  const codebase = ts ? "ts" : "js";
  const res = await prompts([
    {
      type: "text",
      name: "app",
      message: "What should we call your BOS application?",
    },
    {
      type: async prev => ((await hasDirectory(getDir(prev))) ? "text" : null),
      name: "dir",
      message: async prev =>
        `Looks like a directory already exists called "${slugify(prev, {
          lower: true,
        })}". Where should your app be placed instead?`,
    },
  ]);

  const name = res.app.trim();
  const slug = slugify(name, { lower: true });
  const dir = res.dir || path.join(".", slug);

  try {
    await mvdir(path.join(__dirname, codebase), dir, { copy: true });
    await mvdir(path.join(dir, "_gitignore"), path.join(dir, ".gitignore"));

    const prefixPath = p => path.join(dir, p);

    await mvdir(path.join(__dirname, codebase), dir, { copy: true });
    await mvdir(path.join(dir, "/apps/%APPNAME%"), path.join(dir, `/apps/${name}`));

    await replace({
      files: [
        "README.md",
        "bos.config.json",
        `apps/${name}/widget/app.${ts ? "tsx" : "jsx"}`,
      ].map(prefixPath),
      from: /%APPNAME%/g,
      to: name,
    });

    await replace({
      files: ["README.md", "bos.config.json", "package.json"].map(prefixPath),
      from: /%APPNAME%/g,
      to: slug,
    });

    console.log(`All done, switch to the "${res.dir || slug}" directory to get started.`);
    console.log("Be the BOS!");
  } catch (err) {
    console.error(err);
    console.log(
      `Something went wrong when generating your app. You may need to delete the folder at ${dir}`
    );
  }
}

async function hasDirectory(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch (err) {
    return false;
  }
}

function getDir(appName) {
  const slug = slugify(appName, { lower: true });
  return path.join(".", slug);
}
