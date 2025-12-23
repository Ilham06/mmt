pipeline {
  agent any

  environment {
    APP_DIR = "/srv/fmt"
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      when {
        buildingTag()
      }
      steps {
        dir(APP_DIR) {
          checkout scm
        }
      }
    }

    stage('Set Version') {
      when {
        buildingTag()
      }
      steps {
        script {
          VERSION = env.TAG_NAME
          echo "Deploying ${VERSION}"
        }
      }
    }

    stage('Build Image') {
      when {
        buildingTag()
      }
      steps {
        dir(APP_DIR) {
          sh "docker build -t money-tracking:${VERSION} ."
        }
      }
    }

    stage('Deploy') {
      when {
        buildingTag()
      }
      steps {
        dir(APP_DIR) {
          sh """
          export APP_VERSION=${VERSION}
          docker compose -f docker-compose.prod.yml up -d
          """
        }
      }
    }
  }
}
