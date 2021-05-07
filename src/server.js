const express = require('express')
const app = express()

const path = require('path')

const pdf = require('html-pdf')

const puppeteer = require('puppeteer')

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

app.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto('http://localhost:3333', {
    waitUntil: 'networkidle0' 
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  })

  await browser.close()

  res.contentType('application/pdf')

  return res.send(pdf)
})

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