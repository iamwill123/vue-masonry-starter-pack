<!--https://shershen08.github.io/vue-plugins-demo-static/index.html#/masonry-->
<template>
  <div v-masonry class="PhotoLayout item-container" transition-duration="0.3s" item-selector=".item">
    <div v-if="photos && photos.length">
      <!--<p>{{postId}}</p>-->
      <div v-masonry-tile class="item" v-for="photo in photos" :key="photo.id">
         <!-- block item markup -->
        <img v-bind:src="photo" alt="euroTrip">
      </div>
    </div>
    <div v-if="errors && errors.length">
      <div v-masonry-tile class="item" v-for="error in errors" :key="error.id">
        {{error.message}}
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import {HTTP, RSS2JSON} from './http-common'

Vue.use(VueMasonryPlugin)

export default {
  name: 'PhotoLayout',
  props: ['postId'],
  data () {
    return {
      msg: 'Welcome to Your Photo gallery',
      photos: [],
      feeds: [],
      errors: []
    }
  },
  created: function () {
    let API_KEY = `8dc862c7d439e77f903ad871743164b9`
    let euroTripAlbumPhotosetId = `72157683737917494`
    HTTP.get(`?method=flickr.photosets.getPhotos&api_key=${API_KEY}&photoset_id=${euroTripAlbumPhotosetId}&privacy_filter=1&format=json&nojsoncallback=1`)
    .then(response => {
      let flickrResponse = response.data
      this.getFlickrImages(flickrResponse)
      // this.photos = response.data
      console.log(`
        Status Response: ${flickrResponse.stat},
        Owner Name: ${flickrResponse.photoset.ownername},
        Album Name: ${flickrResponse.photoset.title},
        Total Photos: ${flickrResponse.photoset.total}
      `)
    })
    .catch(e => {
      this.errors.push(e)
      console.log(`<error> ${e} </error>`)
    })
    let mediumUserWill = `https://medium.com/feed/@iamwill.us`
    RSS2JSON.get(`?rss_url=${mediumUserWill}`)
    .then(response => {
      let mediumResponse = response.data
      this.getMediumFeed(mediumResponse)
      console.log(`
        Status Response: ${mediumResponse.status},
        Medium Url: ${mediumResponse.feed.url},
        Medium Title: ${mediumResponse.feed.title},
        Medium Link: ${mediumResponse.feed.link},
        Medium Image: ${mediumResponse.feed.image}
      `)
    })
    .catch(e => {
      this.errors.push(e)
      console.log(`<error> ${e} </error>`)
    })
  },
  methods: {
    getFlickrImages: function (result) {
      this.photos = result.photoset.photo.map(function (img) {
        return `https://farm${img.farm}.static.flickr.com/${img.server}/${img.id}_${img.secret}.jpg`
      })
    },
    getMediumFeed: function (result) {
      this.feeds = result
      console.log(result)
    }
  },
  mounted: function () {
    // Vue.redrawVueMasonry()
  }
}
</script>

<style lang="scss" scoped>
  @import 'styles/global.scss';
  
  .item-container {
    width: 100%;
    
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    
    .item {
      float: left;
      opacity: 0.9;
      padding: 0.5rem;
      -webkit-transition: 100ms;
         -moz-transition: 100ms;
          -ms-transition: 100ms;
           -o-transition: 100ms;
              transition: 100ms;
    
      img {
        display: block;
        width: 100%;
      }
      
      &:hover {
        cursor: pointer;
        opacity: 1;
        padding: 0.2rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-transition: 100ms;
           -moz-transition: 100ms;
            -ms-transition: 100ms;
             -o-transition: 100ms;
                transition: 100ms;
      }
      
      @include mobile {
        width: 100%;
      }
      @include tablet {
        width: 50%;
      }
      @include desktop {
        width: 33.333%;
      }
    }
  }
</style>