<template>
  <div class="blog container">
    <div class="row">
      
      <div v-masonry class="item-container" transition-duration="0.5s" item-selector=".item">
        <div v-if="posts && posts.length">
          <div v-masonry-tile class="item" v-for="post in posts">
            <div class="item-content">
              <div class="img-blend">
                <img v-bind:src="post.imageURL">
              </div>
              <div class="caption">
                <h3>{{post.title | uppercase}}</h3>
                <p>by: {{post.user}}</p>
                <p>
                  <router-link :to="'/posts/' + post.id" class="btn btn-outline-primary btn-block" role="button">Read</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="feeds.items">
          <div v-masonry-tile class="item" v-for="feed in feeds.items">
            <div class="item-content">
              <div class="img-blend">
                <img src="http://placehold.it/300x150" alt="">
                <!--<img v-bind:src="http://placehold.it/300x150">-->
              </div>
              <div class="caption">
                <h3>{{feed.title | uppercase}}</h3>
                <p>by: {{feed.author}}</p>
                <p>
                  <router-link :to="'/posts/4'" class="btn btn-outline-primary btn-block" role="button">Read</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>  
</template>
 
<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import {RSS2JSON} from './http-common'

Vue.use(VueMasonryPlugin)

export default {
  name: 'blog',
  data () {
    return {
      title: 'Blog App',
      newPost: {},
      feeds: [],
      errors: [],
      posts: [{
        'user': 'Will & Steph',
        'id': 0,
        'title': 'EuroTrip',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        'imageURL': 'https://farm5.static.flickr.com/4325/35861704352_bb85336569.jpg'
      },
      {
        'user': 'Steph',
        'id': 1,
        'title': 'qui est esse',
        'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        'imageURL': 'http://placehold.it/300x150'
      },
      {
        'user': 'Will',
        'id': 2,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        'imageURL': 'http://placehold.it/300x150'
      },
      {
        'user': 'Steph',
        'id': 3,
        'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        'imageURL': 'http://placehold.it/300x150'
      }]
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
      console.log(`Medium fetch successful`)
    },
    deletePost: function (post) {
      console.log(post)
      this.posts.splice(this.posts.indexOf(post), 1)
    },
    addPost: function () {
      this.posts.push({
        'userId': 1,
        'id': this.posts.length + 1,
        'title': this.newPost.title,
        'body': this.newPost.body
      })
      this.newPost = {}
    }
  },
  mounted: function () {
    // Vue.redrawVueMasonry()
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/global.scss';

 .blog {
   background-color: transparent;
   margin-top: 2rem;
   
   .blog-main--title {
     color: black;
     text-align: center;
    }
   
    .blog-posts {
       background: whitesmoke;
       text-align: center;
       /*border: 1px grey solid;*/
       /*width: 100%;*/
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
    
      .item-content{
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
        background: lavenderblush;
        border-radius: .25rem;
        
        img {
          display: block;
          width: 100%;
          border-radius: .25rem;
          opacity: 0.9;
        }
      }
    }

  }
</style>

<!--http://baljeetsingh.in/blog/running-vue-js-2-0-creating-simple-blog-application-709/-->
<!--<h2 class="blog-main--title">{{title}}</h2>-->
    <!-- Trigger the modal add post with a button -->
    <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNewPost">New Post</button>-->
    <!-- Add Post -->
    <!--<div id="addNewPost" class="modal fade" role="dialog">-->
    <!--  <div class="modal-dialog">-->
        <!-- Add Post Content-->
    <!--    <div class="modal-content">-->
    <!--      <div class="modal-header">-->
    <!--        <button type="button" class="close" data-dismiss="modal">&times;</button>-->
    <!--        <h4 class="modal-title">Add New Post</h4>-->
    <!--      </div>-->
    <!--      <div class="modal-body">-->
    <!--          <div class="form-group">-->
    <!--            <label for="title">Title:</label>-->
    <!--            <input type="title" class="form-control" id="title" v-model="newPost.title">-->
    <!--          </div>-->
    <!--          <div class="form-group">-->
    <!--            <label for="body">Content:</label>-->
    <!--            <textarea class="form-control" rows="5" id="body" v-model="newPost.body"></textarea>-->
    <!--          </div>-->
    <!--      </div>-->
    <!--      <div class="modal-footer">-->
    <!--        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addPost()">Add</button>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->