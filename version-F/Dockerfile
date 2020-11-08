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

# expose the default port used by serve
EXPOSE 5000

# start serve (static site server)
CMD ["node", "./node_modules/serve/bin/serve.js", "-s", "dist/starwars-plot-generator"]
