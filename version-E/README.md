# starwars-plot-generator
Web application for generating new star wars plot

## Used technologies
  * typescript
  * react
  * redux
    * for state management
  * redux-thunk
    * asynchronous updates
  * bootstrap 4.4.1

## How to run
Clone the repository
```sh
git clone https://github.com/pavolvarga/starwars-plot-generator.git
```
Install it
```sh
cd starwars-plot-generator/version-D
npm install
```
Build it
```sh
npm run build
```
Run it
```sh
node ./node_modules/serve/bin/serve.js -s build
```
Type into browser's address bar:
```
http://localhost:5000
```

## How to run via docker
Pull the image
```sh
docker pull pavolvarga1024/starwars-plot-generator:v0.5.0-version-E
```

Run the image
```sh
docker run -p 5000:5000 pavolvarga1024/starwars-plot-generator:v0.5.0-version-E
```

Type into browser's address bar:
```
http://localhost:5000
```