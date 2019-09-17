node {
    checkout scm

    docker.withRegistry('http://localhost:8085') {

        docker.image('newimage').inside {
            sh 'sleep 1m'
            sh 'echo "hello"'
        }
    }
}
