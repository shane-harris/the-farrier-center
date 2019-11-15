const express = require('express')
const app = express()

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/horses', (req, res) => {
  res.render('horses.ejs')
})

app.get('/horse', (req, res) => {
  res.render('horse.ejs')
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})
