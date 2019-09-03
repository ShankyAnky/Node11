const sonarqubeScanner = require('sonarqube-scanner')
sonarqubeScanner({
  serverUrl: 'http://192.168.1.166:9000',   
  options : {
    'sonar.sources': '.',
    'sonar.inclusions' : 'services/**' // Entry point of your code
 }  
}, () => {})
