pipeline {
    agent any 

     stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
    }

    stage('Client Tests') {
    steps {
        dir('src') {
            sh 'npm install'
            sh 'npm test'
        }
    }
}
}