class SassTranslator {
    constructor(inputData) {
        this.inputData = inputData
        this.output = []
    }

    translate() {
        for (const category in this.inputData) {
            let categoryTokens = []
            for (const token in this.inputData[category]) {
                if (this.isLastTokenInCategory(token, category)) {
                    categoryTokens.push(`\t'${token}': ${this.inputData[category][token]}\n`)
                } else {
                    categoryTokens.push(`\t'${token}': ${this.inputData[category][token]},\n`)
                }
            }
            const result = {
                [`$${category}`]: categoryTokens
            }
            this.output.push(result)
        }
    }

    isLastTokenInCategory(currentToken, category) {
        return this.inputData[category][currentToken] === Object.values(this.inputData[category])[Object.values(this.inputData[category]).length - 1]
    }

    format() {
        let formattedOutput = []
        for (let i = 0; i < this.output.length; i++) {
            const categoryKey = this.output.map(cat => Object.keys(cat)[0])
            formattedOutput.push(`${categoryKey[i]}: (\n`)
            for (const token in this.output[i]) {
                formattedOutput.push(this.output[i][token])
            }
            formattedOutput.push(`);\n\n`)
        }
        return Array.prototype.concat.apply([], formattedOutput).join('')
    }

    writeToFile(outputDir, fs) {
        const formattedOutput = this.format()
        fs.writeFile(`${outputDir}/tokens.scss`, formattedOutput, function(err) {
            if (err) {
                throw err;
            }
            console.log("tokens.scss generated");
        })
    }
}

module.exports = SassTranslator