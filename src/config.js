require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  useSeed: true,
  app: {
    title: 'Talk Funnel',
    description: 'Platform to share the Topics for Studio Events',
    head: {
      titleTemplate: '%s | Talk Funnel',
      meta: [
        {name: 'description', content: 'Platform to share the Topics for Studio Events'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Talk Funnel'},
        {property: 'og:image', content: 'https://techfunnel.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Talk Funnel'},
        {property: 'og:description', content: 'Platform to share your ideas for Tech Friday.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:title', content: 'Talk Funnel'},
        {property: 'og:description', content: 'Platform to share your ideas for Tech Friday.'},
        {property: 'og:image', content: 'https://techfunnel.herokuapp.com/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
