node {
    checkout scm

    docker.withRegistry('http://localhost:8085') {

        docker.image('myimage').inside {
            
            sh 'echo "hello"'
        }
    }
}


node {
    checkout scm
    def customImage = docker.build("my-image:${env.BUILD_ID}")
    customImage.push()
}
