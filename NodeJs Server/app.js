const express = require('express')
const app = express()
const port = 9000

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', (req, res) => res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
`))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
