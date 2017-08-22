<template>
  <div class="container">
    <div class="row">

      <div v-for="post in posts" v-if="$route.params.id == post.id">
        <div class="caption">
          <h3> {{ post.title | uppercase }} </h3>
          <p> by: {{ post.user }} </p>
          <p> {{ post.body }} </p>
          <p> Route-id: {{ $route.params.id }} </p>
          <p> Post-id: {{ post.id }} </p>
        </div>
        <hr>
        <photo-layout v-bind:post-id="post.id" v-if="post.id == 0"></photo-layout>
        <hr>
      </div>
      
      <div v-for="feed in feeds.items" v-if="$route.params.id == 4">
        <div class="caption">
          <h3> {{ feed.title | uppercase }} </h3>
          <p> by: {{ feed.author }} </p>
          <p> {{ feed.pubDate | formatDate }} </p>
          <div v-html="feed.description"></div>
          <p> Route-id: {{ $route.params.id }} </p>
        </div>
        <hr>
      </div>
      
      <div v-show="posts || feeds.item" v-masonry class="item-container" transition-duration="0.2s" item-selector=".item">
        <div v-for="post in posts">
          <div class="post-navigation">
            <div v-masonry-tile class="item">
              <div class="item-content">
                <div class="caption">
                  <h4> {{ post.title }} </h4>
                  <p> by: {{ post.user }} </p>
                  <p>
                    <router-link :to="'/posts/' + post.id" class="btn btn-outline-primary btn-block" role="button">Read</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-for="feed in feeds.items">
          <div class="post-navigation">
            <div v-masonry-tile class="item">
              <div class="item-content">
                <div class="caption">
                  <h4> {{ feed.title }} </h4>
                  <p> by: {{ feed.author }} </p>
                  <p>
                    <router-link :to="'/posts/4'" class="btn btn-outline-primary btn-block" role="button">Read</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div><!--masonry end-->
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import PhotoLayout from '@/components/photo-layout'
import {VueMasonryPlugin} from 'vue-masonry'
import {RSS2JSON} from './http-common'

Vue.use(VueMasonryPlugin)

export default {
  name: 'Posts',
  components: {
    PhotoLayout
  },
  data () {
    return {
      posts: [{
        'user': 'Will & Steph',
        'id': 0,
        'title': 'EuroTrip',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        'user': 'Steph',
        'id': 1,
        'title': 'qui est esse',
        'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      },
      {
        'user': 'Will',
        'id': 2,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      },
      {
        'user': 'Steph',
        'id': 3,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      }],
      feeds: [],
      errors: []
    }
  },
  created: function () {
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
    getMediumFeed: function (result) {
      this.feeds = result
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'styles/global.scss';
  
  .post-navigation {
    display: block;
    bottom: 0;
  }
  .item-container {
    width: 100%;
    margin: 0 auto;
    
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .item {
    @include mobile {
      width: 100%;
      margin-bottom: 10px;
    }
    @include tablet {
      width: 50%;
      margin-bottom: 10px;
    }
    @include desktop {
      margin: 10px;
      width: 360px;
    }
  }
  .item {
    float: left;
    opacity: 1;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 2px 0 rgba(0, 0, 0, 0.01);
  
    .item-content {
      width: 100%;
      padding: 0.9rem;
      background-color: whitesmoke;
      
      .caption h3 {
        margin-top: 1rem;
        margin-bottom: 0.1rem;
      }
      
       &:hover {
        /*cursor: pointer;*/
        opacity: 1;
        padding: 0.8rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-transition: 100ms;
        -moz-transition: 100ms;
        -ms-transition: 100ms;
        -o-transition: 100ms;
        transition: 100ms;
        
        img {
          opacity: 1;
          -webkit-transition: 500ms;
          -moz-transition: 500ms;
          -ms-transition: 500ms;
          -o-transition: 500ms;
          transition: 500ms;
        }
      }
    }
    
    .img-blend {
      background: beige;
      
      img {
        display: block;
        width: 100%;
        border-radius: .25rem;
        opacity: 0.9;
      }
    }
  }
</style>

<!--<div v-if="$route.params.id">-->
<!--  <div class="caption">-->
<!--    <h3> {{ posts[$route.params.id].title | uppercase }} </h3>-->
<!--    <p> by: {{ posts[$route.params.id].user }} </p>-->
<!--    <p> {{ posts[$route.params.id].body }} </p>-->
    
<!--    <p> post id: {{ $route.params.id }} </p>-->
<!--  </div>-->
<!--</div>-->