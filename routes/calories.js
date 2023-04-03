let fs = require('fs')
let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
    let calories = getData()
    let total = 0
    calories.forEach(c => total += Number(c.amount))
    res.render('calories', {calories: calories, total: total >= 0 ? total : 0} )
})

router.route('/create')
    .get((req, res) => {
        res.render('create')
    })
    .post((req, res) => {
        let calories = getData()

        calories.push({
            id: Math.random().toString(16).slice(2),
            food: req.body.food,
            amount: req.body.amount,
        })

        saveData(calories)
        res.redirect('/calories')
    })

router.delete('/delete', (req, res) => {
    let calories = getData()

    let newCalories = remove(calories, req.body.id)

    saveData(newCalories)

    res.json({ deleted: true })
})

function  getData() {
    return JSON.parse(fs.readFileSync(`./data/calories.json`))
}

function saveData(calories) {
    fs.writeFileSync(`./data/calories.json`, JSON.stringify(calories))
}

function  remove(calories, id) {
    return calories.filter(calorie => calorie.id != id)
}

module.exports = router