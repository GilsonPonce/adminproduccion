// vue.config.js
module.exports = {
    // options...
    devServer: {
        //'http://apiproduccion.novared.local/',
        //'http://tablet.novared.local/',
        //'https://novaproduccion.gjponce.com/'
        proxy: 'https://novaproduccion.gjponce.com/',
    }
  }