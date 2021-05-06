const express = require('express')
const app = express()

const path = require('path')

const pdf = require('html-pdf')

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00"
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00"
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00"
  }
]

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, ''))

app.get('/', (req, res) => {
  return res.render("print", { passengers }, (err, html) => {
    if (err) {
      return res.send('Erro na leitura do arquivo')
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      }
    }

    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return res.send('Erro ao gerar o PDF')
      }

      return res.send(html)
    })
  })
})

/* Renderizar cada arquivo ejs
  const ejs = require('ejs')
  app.get('/', (req, res) => {
    ejs.renderFile(path.join(__dirname, 'print.ejs'), { passengers })
    return response.send(passengers)
  })
*/

app.listen(3333, () => console.log('Running on http://localhost:3333'))