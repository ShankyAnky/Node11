/*node {
    checkout scm

    docker.withRegistry('http://localhost:8085') {

       
             def customImage = docker.build("registry:${env.BUILD_ID}") 
            customImage.push()
            
            
        }
    }*/


/*node {
    checkout scm

    docker.withRegistry('https://registry.example.com', 'credentials-id') {

        def customImage = docker.build("my-image:${env.BUILD_ID}")

        /* Push the container to the custom Registry */
   /*     customImage.push()
    }
}*/
libraries {
  lib('library@master')
}

pipeline {
    agent any
    stages {
        
        stage('email') {
            steps {  

    
    email()
}
}
    }
}
