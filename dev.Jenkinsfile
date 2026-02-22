// @Library('laiye') _

pipeline {
    environment {
        PROJECT = 'uibot-commander-v5'
    }
    agent any
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '3')
    }
    stages {
        stage('preparation') {
            steps {
                echo "workspace: ${WORKSPACE}"
                echo "BUILD_ID: ${BUILD_ID}"
                echo "node_name: ${NODE_NAME}"
                
                sh '''curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=66fb6506-d16f-4f11-9179-763aa1b35dfc' \
   -H 'Content-Type: application/json' \
   -d '
{
    "msgtype": "markdown",
    "markdown": {
        "content": "开发环境开始构建，请做好心理准备\\n>项目:<font color=\\"blue\\">''' + "${JOB_NAME}" + '''</font>\\n>分支名:<font color=\\"blue\\">''' + "${BRANCH_NAME}" + '''</font>\\n>构建ID:<font color=\\"blue\\">''' + "${BUILD_ID}" + '''</font>"
    }
}
'
'''
            }
        }
        stage('Build Docker Images') {
            when { branch "feature-*" }
            failFast true
            parallel {
                    stage('Build view-commander image') {
                    agent any
                    stages {

                        stage('Build view-commander image') {
                            steps {
                                echo "view-commander"
                                script {
                            sh "docker build  -f ./view.Dockerfile -t registry.cn-beijing.aliyuncs.com/laiye-rpa/view-commander:${BRANCH_NAME}-${BUILD_ID} ."
                            sh "docker push registry.cn-beijing.aliyuncs.com/laiye-rpa/view-commander:${BRANCH_NAME}-${BUILD_ID}"
                                }
                            }
                        }
                    }
                }
                
            }
        }

        stage('Deploy To 250') {
            when { branch "feature-*-std" }
            steps {
                sh "ssh root@172.30.0.250 \"echo \"frontend_commander_tag=${BRANCH_NAME}-${BUILD_ID}\" > /root/dev/tag.frontend.commander.version\""
                lock(extra: [[resource: 'server-172.30.0.250']], resource: 'server-172.30.0.250') {
                    sh "ssh root@172.30.0.250 /root/dev/deploy.sh"
                }
            }
        }
    }
    post {
        success {
            sh '''curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=66fb6506-d16f-4f11-9179-763aa1b35dfc' \
   -H 'Content-Type: application/json' \
   -d '{
    "msgtype": "markdown",
    "markdown": {
        "content": "开发环境构建完成\\n>项目:<font color=\\"blue\\">''' + "${JOB_NAME}" + '''</font>\\n>分支名:<font color=\\"blue\\">''' + "${BRANCH_NAME}" + '''</font>\\n>构建ID:<font color=\\"blue\\">''' + "${BUILD_ID}" + '''</font>\\n>构建结果:<font color=\\"green\\">成功</font>"
    }
}'
'''
        }
        unsuccessful {
            sh '''curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=66fb6506-d16f-4f11-9179-763aa1b35dfc' \
   -H 'Content-Type: application/json' \
   -d '{
    "msgtype": "markdown",
    "markdown": {
        "content": "开发环境构建完成\\n>>分支名:<font color=\\"blue\\">''' + "${BRANCH_NAME}" + '''</font>\\n>构建ID:<font color=\\"blue\\">''' + "${BUILD_ID}" + '''</font>\\n>构建结果:<font color=\\"red\\">失败</font>"
    }
}'
'''
        }
    }
}
