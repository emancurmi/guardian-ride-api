function makeUserDrinksArray() {
    return [
        { "userid": 1, "drinkid": 2, "userdrinktime": '12/3/20 12:30:39' },
        { "userid": 1, "drinkid": 2, "userdrinktime": '12/3/20 12:30:39' },
        { "userid": 2, "drinkid": 1, "userdrinktime": '12/3/20 12:30:39' },
        { "userid": 3, "drinkid": 1, "userdrinktime": '12/3/20 12:30:39' }
    ]
}

function resultsUserDrinksArray() {
    return [
        { "userdrinkid": 1, "userid": 1, "drinkid": 2, "userdrinktime": '12/3/20 12:30:39' },
        { "userdrinkid": 2, "userid": 1, "drinkid": 2, "userdrinktime": '12/3/20 12:30:39' },
        { "userdrinkid": 3, "userid": 2, "drinkid": 1, "userdrinktime": '12/3/20 12:30:39' },
        { "userdrinkid": 4, "userid": 3, "drinkid": 1, "userdrinktime": '12/3/20 12:30:39' }
    ]
}

module.exports = {
    makeUserDrinksArray,
    resultsUserDrinksArray
}