function makeDrinksArray() {
    return [
        { "drinkname": "Vodka", "drinkalcoholvalue":  31 },
        { "drinkname": "Johne Walker", "drinkalcoholvalue":  29 },
        { "drinkname": "JB", "drinkalcoholvalue":  31 },
        { "drinkname": "Martini", "drinkalcoholvalue":  31 }
    ]
}

function resultsDrinksArray() {
    return [
        { "drinkid": 1, "drinkname": "Vodka", "drinkalcoholvalue": 31 },
        { "drinkid": 2, "drinkname": "Johne Walker", "drinkalcoholvalue": 29 },
        { "drinkid": 3, "drinkname": "JB", "drinkalcoholvalue": 31 },
        { "drinkid": 4, "drinkname": "Martini", "drinkalcoholvalue": 31 }
    ]
}

module.exports = {
    makeDrinksArray,
    resultsDrinksArray
}