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

    }
}*/

library identifier: 'library@master', retriever: modernSCM(
[$class: 'GitSCMSource',
remote: 'https://github.com/Ganter123/library.git',
credentialsId: 'Ganter123'])
