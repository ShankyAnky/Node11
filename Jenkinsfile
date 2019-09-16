pipeline {
   agent {
        docker {image 'node'
               args '-u 0'}
    }

    stages {
        
        stage('Build and Test') {
            steps {  
                   
                 //   sh 'apt-get install telnetd -y'
                   //sh 'systemctl status inetd'
                    sh 'ping 192.168.1.166 -c 5'
                    sh 'apt update -y'
                    sh 'apt install default-jdk -y'
                    sh 'apt update -y'
                    sh 'npm install'                  
                    sh './node_modules/.bin/eslint -f checkstyle --ignore-path .gitignore . --fix > eslint.xml'
                    sh './node_modules/.bin/nyc --reporter=cobertura node_modules/.bin/_mocha "test/**/*.js"'
                    sh 'npm install sonarqube-scanner --save-dev' 
                    sh 'ls -la'
            }
        }
        
        stage('Checkstyle') {
           steps {        
        checkstyle pattern: 'eslint.xml'
           }
        }
        
        stage("Extract test results") {
            steps {
                cobertura coberturaReportFile: 'reports/cobertura-coverage.xml'
               // sh 'sleep 10000'
            }
        } 
       stage("sidebar link") {
        steps  { 
        addBadge(icon: "folder.gif", text: "scm", link: "https://github.com/Ganter123/Node11.git")  
         addShortText(text: "${GIT_AUTHOR_NAME}")  

        }
    } 

       
       stage('build && SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonar1') {
                sh 'node sonar-project.js'
                   
                    }
                }
        }
     

        
    
       /* stage('build user') {
      steps {
        wrap([$class: 'BuildUser']) {
          sh 'echo "${BUILD_USER}"'
        }
      }
    }
     */
    }   


        environment {
            EMAIL_TO = 'darpan.patel@volansys.com' 
            GIT_AUTHOR_NAME  = 'Ganter123'
        } 
       
         
           post {

            
                  failure {
                emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                        to: EMAIL_TO, 
                        subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
            }
            unstable {
                emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                        to: EMAIL_TO, 
                        subject: 'Unstable build in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
            }
            changed {
                emailext body: 'Check console output at $BUILD_URL to view the results.', 
                        to: EMAIL_TO, 
                        subject: 'Jenkins build is back to normal: $PROJECT_NAME - #$BUILD_NUMBER'
            }
        }

}     
