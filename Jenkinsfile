@Library('laiye') _

pipeline {
    environment {
        PROJECT = 'uibot-commander-v5-view'
    }
    agent any
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '3')
    }
    stages {

        stage('Build Docker Images') {
            failFast true
            parallel {
                

                stage('Build view-commander image') {
                    when { tag "v*" }
                    agent any
                    stages {

                        stage('Build view-commander image') {
                            steps {
                                echo "view-commander"
                                script {
                                    rpa.build_image("${env.PROJECT}", "view-commander","${env.BRANCH_NAME}", "./view.Dockerfile")
                                }
                            }
                        }
                    }
                }

                 
                stage('deploy view-commander to test') {
                    agent any
                    when { branch "release" }
                    steps {
                        script {
                            rpa.test_deploy("${env.PROJECT}", "view-commander", "./view.Dockerfile")
                        }
                    }
                }

                
                stage('Build view-commander for develop') {
                    agent any
                    when { branch "develop" }
                    steps {
                        script {
                            rpa.test_build("${env.PROJECT}", "view-commander", "./view.Dockerfile")
                        }
                    }
                }
                
            }
        }
    }
    post {
        success {
            script {
                post.post_cibot()
            }
        }
    }
}