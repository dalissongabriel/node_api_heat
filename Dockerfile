FROM node:16.13.0-alpine3.11
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN apk add --no-cache bash git
RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc
EXPOSE ${API_PORT}
