import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://api.flickr.com/services/rest`
})

export const chuckNorrisJokes = axios.create({
  baseURL: `http://api.icndb.com/jokes/random/`
})
