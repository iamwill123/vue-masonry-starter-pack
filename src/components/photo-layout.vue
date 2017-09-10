<template>
  <div v-masonry class="PhotoLayout item-container" transition-duration="0s" item-selector=".item">
    <div v-if="photos && photos.length">
      <!--<p>{{postId}}</p>-->
      <div v-masonry-tile class="item" v-for="photo in photos" :key="photo.id">
         <!-- block item markup -->
        <clazy-load :src="photo" alt="bwPhotos">
          <transition name="fade" slot="image">
            <img :src="photo" alt="bwPhotos">
          </transition>
          <transition name="fade" slot="placeholder">
            <div slot="placeholder">
              <div class="placeholderBCG">
                <img :src="photo" alt="bwPlaceholders">
              </div>
            </div>
          </transition>
        </clazy-load>
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
import VueClazyLoad from 'vue-clazy-load'
import {HTTP} from './http-common'

Vue.use(VueMasonryPlugin)
Vue.use(VueClazyLoad)

export default {
  name: 'PhotoLayout',
  props: ['postId'],
  data () {
    return {
      msg: 'Welcome to your gallery',
      photos: [],
      errors: []
    }
  },
  created: function () {
    let API_KEY = `8f29ca9d04e2badc2e07dc346663e0f9`
    let photoSetID = `72157685222990161`
    HTTP.get(`?method=flickr.photosets.getPhotos&api_key=${API_KEY}&photoset_id=${photoSetID}&privacy_filter=1&format=json&nojsoncallback=1`)
    .then(response => {
      let flickrResponse = response.data
      this.getFlickrImages(flickrResponse)
      setTimeout(() => { this.redrawMason() }, 1000)
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
  },
  methods: {
    getFlickrImages: function (result) {
      this.photos = result.photoset.photo.map(function (img) {
        return `https://farm${img.farm}.static.flickr.com/${img.server}/${img.id}_${img.secret}.jpg`
      })
    },
    redrawMason: function () {
      Vue.redrawVueMasonry()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'styles/global.scss';
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .placeholderBCG {
    background-color: grey;
    border-radius: 0.25rem;
    img {
      -webkit-filter: invert(100%); /* Safari 6.0 - 9.0 */
      filter: invert(100%);
      opacity: 0.1;
    }
  }
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
        border-radius: .25rem;
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