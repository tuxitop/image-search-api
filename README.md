# image-search-api
A simple image search api web app powered with expressjs and mongodb for
freecodecamp.com backend developement courses.

## View the app
you can view the app on https://protected-shore-90458.herokuapp.com/

## Purpose
* You can pass a search term after "/api/imagesearch/" and you will recieve a
  list of images in the response. the response will be in JSON format and will
  contain 10 images.
* You can pass an `offset` query with a numerical value, and you will recieve
  the results starting from that position.
* You can view a history of the latest searches by visiting
  "/api/latest/imagesearch/"

### Example usage

https://protected-shore-90458.herokuapp.com/api/imagesearch/lolcats

https://protected-shore-90458.herokuapp.com/api/imagesearch/lolcats?offset=10

https://protected-shore-90458.herokuapp.com/api/latest/imagesearch

## Installation

#### Install and configure mongodb

#### Clone the repo
`git clone https://github.com/tuxitop/image-search-api.git`

`cd image-search-api`

#### Install the dependecies
`npm install`

#### Run the app
`npm start`

you can view it by visiting [http://localhost:3000](http://localhost:3000) with a browser.
