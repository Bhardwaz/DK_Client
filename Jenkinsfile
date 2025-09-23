pipeline {
    agent any
    
    environment {
        VITE_API_URL = credentials('VITE_API_URL')
        IMAGE_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
        CONTAINER_NAME = 'client-container'
        IMAGE_NAME = 'datekarle-app:client'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }
        
        stage('Build & Deploy Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    sh """
                        docker build \
                          --build-arg VITE_API_URL=${VITE_API_URL} \
                          -t ${IMAGE_NAME}-${IMAGE_TAG} \
                          -t ${IMAGE_NAME}-latest .
                    """
                    
                    echo 'Stopping and removing existing container...'
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    
                    echo 'Starting new container...'
                    sh """
                        docker run -d \
                          -p 3000:3000 \
                          --name ${CONTAINER_NAME} \
                          --restart unless-stopped \
                          ${IMAGE_NAME}-${IMAGE_TAG}
                    """
                    
                    echo 'Verifying container health...'
                    sh "sleep 10 && docker ps | grep ${CONTAINER_NAME}"
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker image prune -f || true'
        }
        failure {
            sh "docker rm -f ${CONTAINER_NAME} || true"
            echo 'Pipeline failed - cleaned up resources'
        }
        success {
            echo 'Deployment successful!'
        }
    }
}