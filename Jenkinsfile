pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                    sh 'npm install'                  
                    sh './node_modules/.bin/eslint -f checkstyle --ignore-path .gitignore . --fix > eslint.xml'
                    sh './node_modules/.bin/nyc --reporter=text node_modules/.bin/_mocha "test/**/*.js"'
                    sh 'ls -la'
                   
                  
        
            }
        }
        stage('Checkstyle') {
           steps {        
        checkstyle pattern: 'eslint.xml'
           }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
} 
