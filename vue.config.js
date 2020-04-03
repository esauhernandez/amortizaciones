module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/amortizacion/'
        : '/',
    devServer: {
        proxy: "https://edocta-amortizaciones-services-dot-findep-produccion.appspot.com/",
    }
}