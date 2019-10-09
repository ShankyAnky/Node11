pipeline {
   agent {
        docker {image 'node'
               args '--network="host" -u 0'}
    }

    stages {
        
        stage('Build and Test') {
            steps {  
                   
                 //   sh 'apt-get install telnetd -y'
                   //sh 'systemctl status inetd'
                    sh 'ping 192.168.1.166 -c 5'
                   
                  //  sh 'apt update -y'
                   // sh 'apt install default-jdk -y'
                   // sh 'apt update -y'
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

       
     /*  stage('build && SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonar1') {
                sh 'node sonar-project.js'
                   
                    }
                } 
        } */
     

        
    
       /* stage('build user') {
      steps {
        wrap([$class: 'BuildUser']) {
          sh 'echo "${BUILD_USER}"'
        }
      }
    }
     */
       
       stage('Flock') {
            steps {
             Webhook URL:https://api.flock.com/hooks/sendMessage/1a14fb70-4b86-4e8e-80ce-403ff80f9369
             //  Webhook URL: https://apps.flock.com/manage/webhook/4bea8c4e-b098-406c-a3ea-37c07043c7bb/5ab50486813a4599930a4f23399d7ed2
              //  volansys channel: '#jenkins',
                    color: 'good',
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
            
            }
}
       
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
