function makeUserDrinksArray() {
    return [
        { "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12 16:30:39' },
        { "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12 16:30:39' },
        { "userid": 2, "drinkid": 1, "userdrinktime": '2020-03-12 16:30:39' },
        { "userid": 3, "drinkid": 1, "userdrinktime": '2020-03-12 16:30:39' }
    ]
}

function resultsUserDrinksArray() {
    return [
        { "userdrinkid": 1, "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12T16:30:39.000Z' },
        { "userdrinkid": 2, "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12T16:30:39.000Z' },
        { "userdrinkid": 3, "userid": 2, "drinkid": 1, "userdrinktime": '2020-03-12T16:30:39.000Z' },
        { "userdrinkid": 4, "userid": 3, "drinkid": 1, "userdrinktime": '2020-03-12T16:30:39.000Z' }
    ]
}

module.exports = {
    makeUserDrinksArray,
    resultsUserDrinksArray
}