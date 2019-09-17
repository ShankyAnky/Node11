node {
    checkout scm

    docker.withRegistry('http://localhost:8085') {

        docker.image('myimage').inside {
            
            sh 'echo "hello"'
        }
    }
}
