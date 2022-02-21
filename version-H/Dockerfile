FROM node:alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR starwars-plot-generator
ADD . /starwars-plot-generator

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
