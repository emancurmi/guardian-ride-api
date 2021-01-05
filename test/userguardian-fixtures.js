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
        { "userguardiansid": 1, "userid": 1, "guardianid": 2 },
        { "userguardiansid": 2, "userid": 1, "guardianid": 2 },
        { "userguardiansid": 3, "userid": 2, "guardianid": 1 },
        { "userguardiansid": 4, "userid": 3, "guardianid": 1 }
    ]
}

module.exports = {
    makeUserGuardiansArray,
    resultsUserGuardiansArray
}