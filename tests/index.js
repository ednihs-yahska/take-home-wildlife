const { describe, expect, it } = require('./test-lib');
const CSVParser = require("../src/utilities/csv-parser")


describe("Verify csv parser", ()=>{
    const csvParser = new CSVParser()
    it("Parse simple comma separated fields", ()=>{
        expect(csvParser.parse("field1, field2, field3\n")).toDeepEqualsArr([["field1", "field2", "field3"]]);
    })

    it("Parse quoted fields", ()=>{
        expect(csvParser.parse('field1, "field2", field3\n')).toDeepEqualsArr([["field1", 'field2', "field3"]])
    })

    it("Parse commas in quoted fields", ()=>{
        expect(csvParser.parse('field1, "field2, field3", field4\n')).toDeepEqualsArr([["field1", 'field2, field3', "field3"]])
    })
})