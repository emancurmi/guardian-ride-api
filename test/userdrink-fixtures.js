function makeUserDrinksArray() {
    return [
        { "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12 04:00:00' },
        { "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12 04:00:00' },
        { "userid": 2, "drinkid": 1, "userdrinktime": '2020-03-12 04:00:00' },
        { "userid": 3, "drinkid": 1, "userdrinktime": '2020-03-12 04:00:00' }
    ]
}

function resultsUserDrinksArray() {
    return [
        { "userdrinkid": 1, "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12T04:00:00.000Z' },
        { "userdrinkid": 2, "userid": 1, "drinkid": 2, "userdrinktime": '2020-03-12T04:00:00.000Z' },
        { "userdrinkid": 3, "userid": 2, "drinkid": 1, "userdrinktime": '2020-03-12T04:00:00.000Z' },
        { "userdrinkid": 4, "userid": 3, "drinkid": 1, "userdrinktime": '2020-03-12T04:00:00.000Z' }
    ]
}

module.exports = {
    makeUserDrinksArray,
    resultsUserDrinksArray
}