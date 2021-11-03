#!/bin/bash

npm config set cache /home/node/app/.npm-cache --global
cd /home/node/app
npm install
[ ! -d "/home/node/app/node_modules/@prisma/client" ] && npx prisma generate
npm run dev