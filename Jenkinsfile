/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        VITE_API_URL  = credentials('VITE_API_URL')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Running Build'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Images') {
    steps {
        script {
            echo 'Building docker image for client'
            sh """
                docker build \
                  --build-arg VITE_API_URL=${VITE_API_URL} \
                  -t datekarle-app:client-latest .
            """

            echo 'Removing old client container if exists'
            sh 'docker rm -f client-container || true'

            echo 'Starting new client container'
            sh """
                docker run -d -p 3000:3000 \
                  --name client-container \
                  datekarle-app:client-latest
            """
            echo 'Docker image built successfully'
        }
    }
}

    }
}
