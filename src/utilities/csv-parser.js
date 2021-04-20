class CSVParser {
    parse(text) {
        let lines=[], lineSymbols=[], currentField=[], quoteStarted=false, previousLetter=""
        for (const letter of text) {
            if (letter==='"') {
                if (quoteStarted && previousLetter==='"') {
                    currentField.push(letter)
                }
                quoteStarted = !quoteStarted
                continue
            }
            if (letter === "," && !quoteStarted) {
                lineSymbols.push(currentField.join("").trim())
                currentField = []
                continue
            }
            if (letter==="\n" && !quoteStarted) {
                if (previousLetter === "\r") {
                    currentField = currentField.slice(0, -1)
                }
                lineSymbols.push(currentField.join("").trim())
                lines.push(lineSymbols)
                lineSymbols=[]
                currentField=[]
                continue
            }
            currentField.push(letter)
            previousLetter = letter
        }
        return lines
    }
}

module.exports = CSVParser