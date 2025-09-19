pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo "Running Build"
                sh 'npm install'
                sh 'npm run build'
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