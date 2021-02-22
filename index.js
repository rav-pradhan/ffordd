const fs = require('fs');
const flags = require('flags');
const SassTranslator = require('./translators/SassTranslator')

flags.defineString("input", "tokens.json", "The input directory for your tokens (default: tokens.json)");
flags.defineString("output", "public", "The output directory for your tokens (default is project dir)");
flags.defineString("format", "sass", "The output format (default is sass)");

flags.parse();

let rawData = fs.readFileSync(flags.get("input"))
let parsedData = JSON.parse(rawData)

if (flags.get("format") === "sass") {
    const Sass = new SassTranslator(parsedData)
    Sass.translate();
    Sass.writeToFile(flags.get("output"),fs)
}