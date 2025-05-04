# starwars-plot-generator
Web application for generating new star wars plot

## Used technologies
  * react 17.0.2
    * useReducer & useContext for state management
  * next.js 12.0.7
  * typescript 4.5.2
  * tailwindcss 3.0.7

## How to run
Clone the repository
```sh
git clone https://github.com/pavolvarga/starwars-plot-generator.git
```
Install it
```sh
cd starwars-plot-generator/version-H
npm install
```
Build it
```sh
npm run build
```
Run it
```sh
npm run start
```
Type into browser's address bar:
```
http://localhost:5000
```

## How to run via docker
Pull the image
```sh
docker pull pavolvarga1024/starwars-plot-generator:v0.9.0-version-H
```

Run the image
```sh
docker run -p 5000:5000 pavolvarga1024/starwars-plot-generator:v0.9.0-version-H
```

Type into browser's address bar:
```
http://localhost:5000
```
