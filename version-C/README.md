# starwars-plot-generator
Web application for generating new star wars plot

## Used technologies
  * typescript 3.6.2
  * react 16.8.6
    * hooks
    * using context for state management
  * reactstrap (for using bootstrap)
  
## How to run
Clone the repository
```sh
git clone https://github.com/pavolvarga/starwars-plot-generator.git
```
Install it
```sh
cd starwars-plot-generator/version-C
npm install
```
Build it
```sh
npm run build
```
Run it
```sh
node ./node_modules/serve/bin/serve.js -l 5000 -s build
```
Type into browser's address bar:
```
http://localhost:5000
```

## How to run via docker
Pull the image
```sh
docker pull pavolvarga1024/starwars-plot-generator:v0.9.0-version-C
```

Run the image
```sh
docker run -p 5000:5000 pavolvarga1024/starwars-plot-generator:v0.9.0-version-C
```

Type into browser's address bar:
```
http://localhost:5000
```
