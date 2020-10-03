function makeUserGuardiansArray() {
    return [
        { "userid": 1, "guardianid": 2 },
        { "userid": 1, "guardianid": 2 },
        { "userid": 2, "guardianid": 1 },
        { "userid": 3, "guardianid": 1 }
    ]
}

function resultsUserGuardiansArray() {
    return [
        { "userguardianid": 1, "userid": 1, "guardianid": 2 },
        { "userguardianid": 2, "userid": 1, "guardianid": 2 },
        { "userguardianid": 3, "userid": 2, "guardianid": 1 },
        { "userguardianid": 4, "userid": 3, "guardianid": 1 }
    ]
}

module.exports = {
    makeUserGuardiansArray,
    resultsUserGuardiansArray
}