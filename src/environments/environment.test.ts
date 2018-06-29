const packageJson = require('../../package.json');

export const environment = {
  appName: 'MQ1 Backend',
  envName: 'TEST',
  production: false,
  test: true,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  appConfig:{
    API_URL : 'http://apiouyuan.iaproject.net/api/v1',
    WEB_URL : 'http://apiouyuan.iaproject.net'
  }
};
