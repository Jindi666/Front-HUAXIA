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
                
                sh '''curl 'https://open.feishu.cn/open-apis/bot/v2/hook/40f8fe88-c7db-4438-bf03-8785a0681ae8' \
   -H 'Content-Type: application/json' \
   -d '
{
    "msg_type": "text",
    "content": {
        "text": "开发环境开始构建，请做好心理准备\\n项目:''' + "${JOB_NAME}" + '''\\n分支名:''' + "${BRANCH_NAME}" + '''\\n构建ID:''' + "${BUILD_ID}" + '''"
    }
}
'
'''
            }
        }

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
    post {
        success {
            sh '''curl 'https://open.feishu.cn/open-apis/bot/v2/hook/40f8fe88-c7db-4438-bf03-8785a0681ae8' \
   -H 'Content-Type: application/json' \
   -d '{
       "msg_type": "text",
       "content": {
        "text": "开发环境构建完成项目:''' + "${JOB_NAME}" + '''\\n分支名:''' + "${BRANCH_NAME}" + '''\\n构建ID:''' + "${BUILD_ID}" + '''\\n构建结果:成功\\nTag:''' + "${BRANCH_NAME}-${BUILD_ID}" + '''"
    }
}'
'''
        }
        unsuccessful {
            sh '''curl 'https://open.feishu.cn/open-apis/bot/v2/hook/40f8fe88-c7db-4438-bf03-8785a0681ae8' \
   -H 'Content-Type: application/json' \
   -d '{
       "msg_type": "text",
       "content": {
        "text": "开发环境构建完成项目:''' + "${JOB_NAME}" + '''\\n分支名:''' + "${BRANCH_NAME}" + '''\\n构建ID:''' + "${BUILD_ID}" + '''\\n构建结果:失败"
    }
}'
'''
        }
    }
}
