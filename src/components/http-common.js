import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://api.flickr.com/services/rest`
})
// https://rss2json.com/
export const RSS2JSON = axios.create({
  baseURL: `https://api.rss2json.com/v1/api.json`
})

