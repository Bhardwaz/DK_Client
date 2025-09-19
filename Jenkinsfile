pipeline {
    agent any 

     stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

    stage('Client Tests') {
     steps {
        dir('src') {
            echo "Running Client tests"
            sh 'npm install'
            sh 'npm test'
        }
    }
}
     stage('Build Images') {
    steps {
        echo "Building docker image for client"
        sh 'docker build -t datekarle-app:client-latest .'
        echo "Docker image built successfully"
    }
}
    }
}