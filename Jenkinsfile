node {
    checkout scm

    def customImage = docker.build("node:${env.BUILD_ID}")

    customImage.inside {
        sh 'make test'
    }
}
