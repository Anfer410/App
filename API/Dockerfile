FROM node:12.4.0-buster as debug

WORKDIR /work/

COPY ./src/package.json /work/package.json
RUN npm install
RUN npm install -g nodemon

COPY ./src/ /work/src/

ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","--legacy-watch","./src/server.js" ]
# ENTRYPOINT [ "node", "--inspect=0.0.0.0:9229", "./src/server.js" ]
FROM node:12.4.0 as prod

WORKDIR /work/
COPY ./src/package.json /work/package.json
RUN npm install
COPY ./src/ /work/

CMD node .
