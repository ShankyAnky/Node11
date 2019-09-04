pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh './node_modules/.bin/eslint -f checkstyle --ignore-path .gitignore . > eslint.xml'
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
