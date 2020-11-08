# starwars-plot-generator
Web application for generating new star wars plot

## Used technologies
  * typescript
  * angular 10
    * no state management library
  * bootstrap 4.4.1

## How to run
Clone the repository
```sh
git clone https://github.com/pavolvarga/starwars-plot-generator.git
```
Install it
```sh
cd starwars-plot-generator/version-F
npm install
```
Build it
```sh
ng build
```
Run it
```sh
node ./node_modules/serve/bin/serve.js -s dist/starwars-plot-generator
```
Type into browser's address bar:
```
http://localhost:5000
```

## How to run via docker
Pull the image
```sh
docker pull pavolvarga1024/starwars-plot-generator:v0.6.0-version-F
```

Run the image
```sh
docker run -p 5000:5000 pavolvarga1024/starwars-plot-generator:v0.6.0-version-F
```

Type into browser's address bar:
```
http://localhost:5000
```