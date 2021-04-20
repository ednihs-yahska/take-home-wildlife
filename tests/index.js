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
        expect(csvParser.parse('field1, "field2, field3", field4\n')).toDeepEqualsArr([["field1", 'field2, field3', "field4"]])
    })

    it("Parse carriage returns and line feeds", ()=>{
        expect(csvParser.parse('field1, "field2, field3", field4\r\n')).toDeepEqualsArr([["field1", 'field2, field3', "field4"]])
    })

    it("Parse carriage returns and line feeds in quotes and outside", ()=>{
        expect(csvParser.parse('field1, "field2, field3", field4\r\nfield1, "field2,\r\nfield3", field4\r\n')).toDeepEqualsArr([[ 'field1', 'field2, field3', 'field4' ],
        [ 'field1', 'field2,\r\nfield3', 'field4' ]])
    })
})