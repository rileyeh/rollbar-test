const express = require('express')
const path = require('path')
let Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: '92e8deb0bbd94fc99faf5813faa695bb',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
const app = express()

app.use(express.json())
app.use('/styles', express.static(path.join(__dirname, '/public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    const index = students.findIndex(stu => stu === name)
    name = name.trim()
    if (index === -1 && name !== '') {
        students.push(name)
        rollbar.info('student successfully added', {type: 'manual', author: 'riley'})
        res.status(200).send(students)
    } else if (name === '') {
        let errMsg = 'no name given'
        rollbar.error(errMsg)
        res.status(400).send(errMsg)
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