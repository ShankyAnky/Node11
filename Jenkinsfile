/*  node {
    checkout scm
    /*
     * In order to communicate with the MySQL server, this Pipeline explicitly
     * maps the port (`3306`) to a known port on the host machine.
     */
  /*  docker.image('mysql:5').withRun('-e "MYSQL_ROOT_PASSWORD=my-secret-pw" -p 3306:3306') { c ->
        /* Wait until mysql service is up */
  /*      sh 'while ! mysqladmin ping -h0.0.0.0 --silent; do sleep 1; done'
        /* Run some tests which require MySQL */
  /*      sh 'make check'
    }
} */

/*node {
      stage 'eslint'
        sh './node_modules/.bin/eslint  -f checkstyle --ignore-path .gitignore . --fix > test.xml'
      stage 'test'
        sh './node_modules/.bin/mocha --recursive ./test/*.* --timeout 10000'	
      stage 'after build'            
          checkstyle pattern: 'test.xml'
          withSonarQubeEnv('sonar1') {  
           sh 'node sonar-project.js'                        
        }
       
        //   step([$class: 'Mailer', notifyEveryBuild: true, recipients: 'darpan.patel@volansys.com', sendToIndividuals: true])
    
}*/
stage('Build & eslint'){ 
 node {
    checkout scm 
     docker.image('mongo').withRun('-e "MONGO_INITDB_ROOT_USERNAME=root" -e "MONGO_INITDB_ROOT_PASSWORD=vt123" -p 27018:27017') { c ->       
         sh 'npm install'
         sh 'npm install sonarqube-scanner --save-dev'
         sh './node_modules/.bin/eslint  -f checkstyle --ignore-path .gitignore . --fix > test.xml'
       
        
        }
    }
}

node {
 stage 'test'
   sh './node_modules/.bin/mocha --recursive ./test/index_test.js --timeout 10000 > testfile.xml'
    // stage 'cobertura'
   // sh 'cobertura coberturaReportFile: "reports/cobertura-coverage.xml"'
}

node {
   // docker.image('node').inside('-v --network="host" -u 0') {
    stage 'after build'    
          checkstyle pattern: 'test.xml'
          junit  'testfile.xml'
          withSonarQubeEnv('sonar1') {                                  
                        sh 'node sonar-project.js'                        
        }
    
}

