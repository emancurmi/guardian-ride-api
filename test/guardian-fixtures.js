function makeGuardiansArray() {
    return [
        { "guardianname": "Mike Terance", "guardianphone": "9172008000" },
        { "guardianname": "Johne Walker", "guardianphone": "9172008001" },
        { "guardianname": "Eman Curmi", "guardianphone": "9172008002" },
        { "guardianname": "Manish Paduval", "guardianphone": "9172008003" }
    ]
}

function resultsGuardiansArray() {
    return [
        {"guardianid": 1, "guardianname": "Mike Terance", "guardianphone": "9172008000" },
        { "guardianid": 2, "guardianname": "Johne Walker", "guardianphone": "9172008001" },
        { "guardianid": 3, "guardianname": "Eman Curmi", "guardianphone": "9172008002" },
        { "guardianid": 4, "guardianname": "Manish Paduval", "guardianphone": "9172008003" }
    ]
}

module.exports = {
    makeGuardiansArray,
    resultsGuardiansArray
}