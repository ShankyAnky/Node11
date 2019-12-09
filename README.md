Maintaining common docker templates

This docker-compose file will  make the Jenkins server up along with that it will install sonarqube server which is depend on  postgresql  apart from that it will make volumes on host system for used services.

Prerequisites:
 Installation of  Docker and Docker Compose on host system.

Services

1) Jenkins server:

Used  image: jenkins/jenkins from Docker-hub 

2) postgresql:

 Used image: 'postgres:latest' from Docker-hub

3)  sonarqube:

Used  image: sonarqube:7.9-community from Docker-hub

Sonarqube is depend on postgresql 

Docker volumes:-
 docker volumes (for jenkins, sonarqube, and postgresql ) are created and persisted, even when containers are deleted.

To list volumes:

docker volume ls

Networks:

volansys-cicd is coomon network along all services.

Launching:

docker-compose-sonar-jenkins.yaml up

Without logs

docker-compose-sonar-jenkins.yaml up -d 


Usefull commands:-

Ssh into container

docker exec -ti container_id /bin/bash

Print logs:

docker logs container_id
