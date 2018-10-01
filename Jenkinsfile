#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/annotate'
  def dockerImageName = "${dockerRepoName}:${env.BUILD_ID}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)
    newImage.inside {
      sh 'npm install'
    }
  }

  stage('Deploy') {
    if (BRANCH_NAME == 'staging') {
      newImage.inside {
        sh 'export BUCKET="zooniverse-static"; export PREFIX="preview.zooniverse.org/annotate/"; export BASE_URL="https://preview.zooniverse.org/annotate/"; npm run build && npm run deploy'
      }
    }

    if (BRANCH_NAME == 'master') {
      newImage.inside {
        sh 'export BUCKET="zooniverse-static"; export PREFIX="anno.tate.org.uk/"; export BASE_URL="https://anno.tate.org.uk/"; npm run build && npm run deploy'
      }
    }
  }
}
