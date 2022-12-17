# use latest version
FROM node:alpine

# actualize
RUN apk update

# copy into workdir
WORKDIR starwars-plot-generator
ADD . /starwars-plot-generator

# build the application
RUN npm install
RUN npm run build

EXPOSE 5000

# start serve (static site server)
CMD ["node", "./node_modules/serve/build/main.js", "-l", "5000", "-s", "dist"]
