node {
    checkout scm

    docker.withRegistry('http://localhost:8085') {

        docker.image('my-custom-image').inside {
            sh 'make test'
        }
    }
}
