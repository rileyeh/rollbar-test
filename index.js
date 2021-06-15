const express = require('express')
const path = require('path')
const cors = require('cors')
let Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: '92e8deb0bbd94fc99faf5813faa695bb',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
const app = express()

app.use(cors())
app.use(express.json())
app.use('/styles', express.static(path.join(__dirname, '/public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    const index = students.findIndex(stu => stu === name)
    if (index === -1) {
        students.push(name)
        rollbar.log('student successfully added')
        res.status(200).send(students)
    } else {
        let errMsg = 'student already exists'
        rollbar.error(errMsg)
        res.status(400).send(errMsg)
    }
})

const port = process.env.PORT || 5555

app.use(rollbar.errorHandler())

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})