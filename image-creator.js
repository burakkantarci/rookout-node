const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { format } = require('date-fns')
const axios = require('axios')
var trLocale = require('date-fns/locale/tr')

const width = 1200
const height = 630
var data = {}

const rookout = require('rookout');

rookout.start({
    token: '3218529d13a02689038f3648c8ada18afc50df01d9cdad08feb5010c16d1771b',
    labels:
        {
            "env":"dev" // Optional,see Labels page below Projects
        }
});

module.exports = (config) => {
  axios.get('https://www.doviz.com/api/v7/'+ config.category +'/'+ config.short_code +'/latest?t=5a3k32fGb0asd9')
    .then(function (response) {
      // handle success
      //console.log(response.data);
      data.selling_str = response.data.selling_str;
      data.short_code = response.data.short_code.toLowerCase();
      data.full_name = response.data.full_name;
      data.change_rate_str = response.data.change_rate_str;
      data.status = response.data.status;
      data.date = format(new Date(), 'dd MMMM yyyy - HH:mm', {locale: trLocale});
      data.alarm = config.alarm;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }).then(function () {
      // always executed
      console.log(data);
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./src/'+ data.short_code + (data.alarm == 'yes' ? '-alarm' : '') + '.png').then(image => {
        context.drawImage(image, 0, 0, 1200, 630)

        context.font = 'semibold 24pt Inter'
        context.textAlign = 'left'
        context.textBaseline = 'top'
        context.fillStyle = '#b1d1fc'
        const text = data.full_name
        context.fillText(text, 132, 160)

        context.font = 'bold 96pt Inter'
        context.textAlign = 'left'
        context.textBaseline = 'top'
        context.fillStyle = '#FFF'
        const value = data.selling_str
        context.fillText(value, 132, 200)

        context.font = 'semibold 36pt Inter'
        context.textAlign = 'left'
        context.textBaseline = 'top'
        context.fillStyle = data.status == 'down' ? '#FF5151' : '#5DEC85'
        const change = data.change_rate_str
        context.fillText(change, 132, 360)

        context.font = '16pt Inter'
        context.textAlign = 'left'
        context.textBaseline = 'top'
        context.fillStyle = '#8C9ED9'
        const date = data.date;
        context.fillText(date, 132, 522)

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./output/' + data.short_code + format(new Date(), 'ddMMyyHHmm', {locale: trLocale}) + '.png', buffer)
        console.log("Image created")
      })
    });
}

