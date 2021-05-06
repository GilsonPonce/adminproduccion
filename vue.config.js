// vue.config.js
module.exports = {
    // options...
    devServer: {
        //'http://apiproduccion.novared.local/',
        //'http://tablet.novared.local/',
        proxy: 'http://tablet.novared.local/',
    }
  }