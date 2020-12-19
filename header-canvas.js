const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { format } = require('date-fns')
const axios = require('axios')
var trLocale = require('date-fns/locale/tr')

const rookout = require('rookout');

rookout.start({
    token: '3218529d13a02689038f3648c8ada18afc50df01d9cdad08feb5010c16d1771b',
    labels:
        {
            "env":"dev" // Optional,see Labels page below Projects
        }
});

const width = 1200
const height = 630
const symbols = [
  {
    category: 'golds',
    short_code: 'gram-altin'
  },
  {
    category: 'currencies',
    short_code: 'USD'
  },
  {
    category: 'currencies',
    short_code: 'EUR'
  },
  {
    category: 'parities',
    short_code: 'EUR-USD'
  },
  {
    category: 'currencies',
    short_code: 'GBP'
  },
  {
    category: 'indexes',
    short_code: 'XU100'
  },
  {
    category: 'bonds',
    short_code: 'TAHVIL'
  },
  {
    category: 'coins',
    short_code: 'bitcoin'
  }
]
var data = {};
async function fillData() {
  for (let i = 0; i < symbols.length; i++) {
    const response = await axios.get('https://www.doviz.com/api/v7/'+ symbols[i].category +'/'+ symbols[i].short_code +'/latest?t=5a3k32fGb0asd9');
    data[i] = response.data;
    console.log("Fetched " + response.data.full_name)
  }
}
fillData().then(function () {
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  console.log(data);
  loadImage('./src/piyasa-durumu.png').then(image => {
    context.drawImage(image, 0, 0, 1200, 630)

    for (let i = 0; i < 4; i++) {

      context.font = 'semibold 16pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = '#b1d1fc'
      const text = data[i].full_name;
      context.fillText(text, 50 + (280 * i), 160)

      context.font = 'bold 36pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = '#FFF'
      const value = data[i].selling_str;
      context.fillText(value, 50 + (280 * i), 184)

      context.font = 'semibold 16pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = data[i].status == 'down' ? '#FF5151' : '#5DEC85'
      const change = data[i].change_rate_str;
      context.fillText(change, 50 + (280 * i), 240)  
    }  
    
    for (let i = 0; i < 4; i++) {
      context.font = 'semibold 16pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = '#b1d1fc'
      const text = data[i+4].full_name;
      context.fillText(text, 50 + (280 * i), 340)

      context.font = 'bold 36pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = '#FFF'
      const value = data[i+4].code != 'TAHVIL' ? ( data[i+4].name != 'XU100' ? data[i+4].selling_str : data[i+4].latest_str ) : data[i+4].yield ;
      context.fillText(value, 50 + (280 * i), 364)

      context.font = 'semibold 16pt Inter'
      context.textAlign = 'left'
      context.textBaseline = 'top'
      context.fillStyle = data[i+4].status == 'down' ? '#FF5151' : '#5DEC85'
      const change = data[i+4].change_rate_str;
      context.fillText(change, 50 + (280 * i), 420)  
    }  

    context.font = '16pt Inter'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = '#8C9ED9'
    const date = format(new Date(), 'dd MMMM yyyy - HH:mm', {locale: trLocale});
    context.fillText(date, 50, 562)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./output/header' + format(new Date(), 'ddMMyyHHmm', {locale: trLocale}) + '.png', buffer)
    console.log("Image created")
  })
});


