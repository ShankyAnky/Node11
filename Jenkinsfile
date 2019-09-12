pipeline {
    agent {
        docker {image 'node'
                 args '-u 0'}
                 
                   
    }


    stages {
        
        stage('Build and Test') {
            steps { 
                    sh 'ls -la'
                    sh 'rm -rf .npm'
                    echo 'Listing directory'
                    sh 'node -v'
                    sh 'npm -v'
                    //sh 'chown -R $(whoami) ~/.npm'                    
                    sh 'npm install'      
                    sh 'npm audit fix'
                    sh './node_modules/.bin/eslint -f checkstyle --ignore-path .gitignore . --fix > eslint.xml'
                    sh 'ls'
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
            }
        } 
       
        stage('build && SonarQube analysis') {
            steps {
                withSonarQubeEnv('darpan') {
                sh 'node sonar-project.js'
                   
                    }
                }
        }
    stage("sidebar link") {
        steps  { 
        addBadge(icon: "folder.gif", text: "scm", link: "https://github.com/Ganter123/Node11.git")  
         addShortText(text: "${GIT_AUTHOR_NAME}")  

        }
    }
        stage('SCM') {
            steps {
                git url: 'https://github.com/Ganter123/Node11.git'
            }
        }
        stage('build user') {
      steps {
        wrap([$class: 'BuildUser']) {
          sh 'echo "${BUILD_USER}"'
        }
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
