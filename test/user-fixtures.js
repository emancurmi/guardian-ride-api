function makeUsersArray() {
    return [
        { "username": "Mike Terance", "userphone": "9172008000", "userpin":  1213 },
        { "username": "Johne Walker", "userphone": "9172008001", "userpin": 1216 },
        { "username": "Eman Curmi", "userphone": "9172008002", "userpin": 1215 },
        { "username": "Manish Paduval", "userphone": "9172008003", "userpin": 1214 }
    ]
}

function resultsUsersArray() {
    return [
        { "userid": 1, "username": "Mike Terance", "userphone": "9172008000", "userpin": 1213 },
        { "userid": 2, "username": "Johne Walker", "userphone": "9172008001", "userpin": 1216 },
        { "userid": 3, "username": "Eman Curmi", "userphone": "9172008002", "userpin": 1215 },
        { "userid": 4, "username": "Manish Paduval", "userphone": "9172008003", "userpin": 1214 }
    ]
}

module.exports = {
    makeUsersArray,
    resultsUsersArray
}