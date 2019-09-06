    pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                    sh 'npm install'                  
                    sh './node_modules/.bin/eslint -f checkstyle --ignore-path .gitignore . --fix > eslint.xml'
                    sh './node_modules/.bin/nyc --reporter=cobertura node_modules/.bin/_mocha "test/**/*.js"'
                    sh 'ls -la'
            }
        }
        
        stage('Checkstyle') {
           steps {        
        checkstyle pattern: 'eslint.xml'
           }
        }
        
        stage ("Extract test results") {
            steps {
                cobertura coberturaReportFile: 'reports/cobertura-coverage.xml'
            }
        }
        
        stage ('success'){
            steps {
                script {
                    currentBuild.result = 'SUCCESS'
                }
            }
        }
    }
    post {
        failure {
            script {
                currentBuild.result = 'FAILURE'
            }
        }

        always {
            step([$class: 'Mailer',
                notifyEveryUnstableBuild: true,
                recipients: "darpan.patel@volansys.com",
                sendToIndividuals: true])
        }
    }
        
    }
