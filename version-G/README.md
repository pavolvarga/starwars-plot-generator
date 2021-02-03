# starwars-plot-generator
Web application for generating new star wars plot

## Used technologies
  * typescript
  * VUE 3
    * composition API
  * VUEX 4
    * for state management
  * bootstrap 4.4.1

## How to run
Clone the repository
```sh
git clone https://github.com/pavolvarga/starwars-plot-generator.git
```
Install it
```sh
cd starwars-plot-generator/version-G
npm install
```
Build it
```sh
npm run build
```
Run it
```sh
node ./node_modules/serve/bin/serve.js -s dist
```
Type into browser's address bar:
```
http://localhost:5000
```

## How to run via docker
Pull the image
```sh
docker pull pavolvarga1024/starwars-plot-generator:v0.7.0-version-G
```

Run the image
```sh
docker run -p 5000:5000 pavolvarga1024/starwars-plot-generator:v0.7.0-version-G
```

Type into browser's address bar:
```
http://localhost:5000
```
