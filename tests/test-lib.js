
const describe = function(msg, callback) {
    console.log(`* ${msg}`);
    callback();
};

const it = function(msg, callback) {
    console.log(`- ${msg}`);
    callback();
};

const expect = function(actual) {
    return {
      toBe: function(expected) {
        const res = expected === actual;
        if (res) {
          console.log("✅ passed");
        } else {
          console.log("❌ failed");
        }
        return res;
      },
      toDeepEqualsArr: function(expected) {
        console.log("Expected ", expected, "Actual ",actual)
        if (actual.length != expected.length) {
            console.log(`expected = ${expected} actual = ${actual} (size mismatch)`);
            console.log("❌ failed");
            return false
        }
        let allPassed = true
        let l = 0
        for (let line of actual) {
            let expectedLine = expected[l]
            if (expectedLine.length != line.length) {
                console.log(`expected = ${expectedLine} actual = ${line} (size mismatch)`);
                console.log("❌ failed");
                return false
            }
            for (let i = 0; i<expectedLine.length; i+=1) {
                allPassed = allPassed && (line[i] === expectedLine[i])
            }
            l+=1
        }
        if (allPassed) {
            console.log("✅ passed");
        } else {
            console.log("❌ failed");
        }
        return allPassed
        }
    }
}

module.exports = {describe, it, expect}