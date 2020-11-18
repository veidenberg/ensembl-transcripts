
![screenshot](screenshot.png)

# Ensembl transcript browser

**[Demo site ⇢](https://veidenberg.github.io/ensembl-transcripts/)**

This is a prototype web application that draws gene transcripts using data from [Ensembl REST API](https://rest.ensembl.org). 

## Run locally

1) Download the repo, go to its directory, and launch a server of your choice:
```
python -m SimpleHTTPServer 8000  #python 2
python3 -m http.server 8000 #python 3
http-server -a localhost -p 8000 #Node module
```
2) Point your web browser to http://localhost:8000

### Offline mode

The webapp can also run without a web server (in offline mode):
1) Double-click `index.html` in the app folder
2) Load an example gene or use gene history (see the usage section)

## Usage tips

- Type a gene ID to the search bar and press Enter/click the arrow to render its transcripts
- Submitting empty input will load an example gene (also works offline)
- Transcripts/canvas stretch to the window edges to maximize render area
- Hover interface elements, gene IDs or transcripts for help/metadata
- Blue transcripts are on forward strand / red on reverse strand

## Architecture

- Vue webapp, written in HTML, JavaScript and CSS
- Optimized for perfomrance, bundle size, ease of use and development
- Works out of the box, without bundlers or build pipelines
- Single dependency (Vue.js JavaScript library for reactive UI)

### Backwards compatibility

- Minimum: web browsers with [fetch support](https://caniuse.com/fetch) (from 2015 onwards)
- Recommended: web browsers with [grid support](https://caniuse.com/css-grid) (from 2017 onwards)

### Development

- Use the Vue development version (see index.html) and a hot-reloading server (e.g. Node live-server module)

### Testing

Unit test specifications in the `tests` directory are designed to test the Vue components used in the webapp.

**Setup:**
```
npm install jest            #Jest test framework
npm install @vue/test-utils #Vue unit testing library
npm install vue-jest  #Vue integration
```
**Run the tests:**
```
jest
```
Currently the tests fail for techical reasons (environemnt setup issues). Work in progress...

# License

[MIT](https://opensource.org/licenses/MIT)  
Author: [Andres Veidenberg](https://www.linkedin.com/in/aveidenberg/)