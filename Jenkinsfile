pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'sudo npm install -g'
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
