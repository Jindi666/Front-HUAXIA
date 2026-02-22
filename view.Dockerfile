FROM node:14 as install
WORKDIR /app
COPY package.json package.json
# COPY package-lock.json package-lock.json
# RUN npm config set registry http://192.168.0.27:3003/npm/cache-npm/
#RUN npm install -g cnpm
#RUN npm config set registry http://proget.laiye.com/npm/uibot-npm/
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

FROM install as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:stable
ADD ./sources.list /etc/apt/sources.list
RUN apt-get update && apt-get upgrade -y
USER nginx
RUN mkdir -p /tmp/nginx/log && mkdir -p /tmp/nginx/run
WORKDIR /app
COPY --from=builder --chown=nginx /app/dist/ /app/html/cockpitscreen
COPY --chown=nginx ./nginx/uibot.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx ./nginx/nginx.conf /etc/nginx/nginx.conf
# RUN chown nginx:nginx -R /app/html/
# RUN chmod 777 /app/html/

