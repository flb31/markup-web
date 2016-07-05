requirejs.config({
  baseUrl: 'assets/',
  paths: {
      vendors: 'vendors',
      modules: 'js/modules'
  }
});
requirejs(['modules/main']);