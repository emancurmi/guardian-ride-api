function makeUserDrinksArray() {
    return [
        { "userid": 1, "drinkid":  2 },
        { "userid": 1, "drinkid":  2 },
        { "userid": 2, "drinkid":  1 },
        { "userid": 3, "drinkid":  1 }
    ]
}

function resultsUserDrinksArray() {
    return [
        { "userdrinkid": 1, "userid": 1, "drinkid": 2 },
        { "userdrinkid": 2, "userid": 1, "drinkid": 2 },
        { "userdrinkid": 3, "userid": 2, "drinkid": 1 },
        { "userdrinkid": 4, "userid": 3, "drinkid": 1 }
    ]
}

module.exports = {
    makeUserDrinksArray,
    resultsUserDrinksArray
}