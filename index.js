const express = require('express')
const path = require('path')
let Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: '92e8deb0bbd94fc99faf5813faa695bb',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
const app = express()

app.use('/styles', express.static(path.join(__dirname, '/public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

let waterObj = {
    monday: 0, 
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
}

app.post('/api/water', (req, res) => {
    const {selectedDay, waterAmount} = req.body
    selectedDay = selectedDay.toLowerCase()
    if (waterObj[selectedDay] === 0) {
        waterObj[selectedDay] = +waterAmount
    } else {
        rollbar.log('no can do')
    }
})

const port = process.env.PORT || 5555

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})