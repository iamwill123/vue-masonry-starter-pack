import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://api.flickr.com/services/rest`
})

export const chuckNorrisJokes = axios.create({
  baseURL: 'https://api.icndb.com/jokes/random/',
  responseType: 'json'
})
