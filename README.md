
![screenshot](screenshot.png)

# Ensembl transcript browser

This is a prototype web application that draws gene transcripts using data from [Ensembl REST API](https://rest.ensembl.org).  

**[Demo site ⇢](https://veidenberg.github.io/ensembl-transcripts/)** 

## Run locally

1) Download this repo, go to its root folder, and launch a web server:
```sh
npm start #launches a python server: 'python -m SimpleHTTPServer 8000'
#or, for python 3: python3 -m http.server 8000
#or, use a node module: npm i -g http-server && http-server -a localhost -p 8000
```
2) Point your web browser to http://localhost:8000

**Serverless mode**  
The webapp can also be run offline:
1) Double-click `index.html` in the root folder
2) Load the example gene or use gene history (see [usage](#usage-tips))

## Usage

- Type a gene ID to the search bar and press Enter (or click the arrow icon) to render the transcripts
- Submitting empty input will load an example gene (also works in offline mode)
- The transcripts stretch to maximize the visualization space
- Hover interface elements, gene IDs or transcripts for additional info
- Blue transcripts are on the forward strand, red on the reverse strand

## Architecture

- Vue webapp, written in HTML, JavaScript and CSS
- Optimized for performance, small bundle size, and ease of use
- Works out of the box, without bundlers or build pipelines (quick setup and development)
- Single dependency: [Vue.js](https://vuejs.org) JavaScript library (for reactive UI)

### Compatibility

- Minimum: web browsers with [fetch support](https://caniuse.com/fetch) (from 2015 onwards)
- Recommended: web browsers with [grid support](https://caniuse.com/css-grid) (from 2017 onwards)

## Development

Use the Vue development version (see `index.html`) and a hot-reloading server. 
```sh
npm install -g live-server #installs a development server
live-server --port=8000 #starts the server & opens the webapp
```

### Testing

- Webapp component functions are covered with unit tests (located in `tests/unit` folder)
- Integration and end-to-end (e2e) tests simulate user interaction in the webapp (`tests/integration`)
- [Jest](https://jestjs.io) and [Vue Testing Library](https://github.com/testing-library/vue-testing-library) are used for unit tests, and [Cypress](https://www.cypress.io) for integration/e2e
- All the tests are run without a build step (no need for Babel, WebPack, etc.) 

1) Install the testing tools
```sh
npm install
```
2) Run the unit tests
```sh
jest #or: 'npm run test:unit'
```
3) Run the integration tests
```sh
  npm start #launch a web server (if not already running)
  npm run test:e2e #in a separate terminal window
```
Note: run all the commands in the webapp root foler

# License

[MIT](https://opensource.org/licenses/MIT)  
Author: [Andres Veidenberg](https://www.linkedin.com/in/aveidenberg/)