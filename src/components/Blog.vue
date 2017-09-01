<template>
  <div class="blog container">
    <h2>{{title}}</h2>
    <div class="row">
      
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNewPost">
        New Post
      </button>
        
      <div v-masonry class="item-container" transition-duration="0s" item-selector=".item">
        <div v-if="jokes">
          <div v-masonry-tile class="item" v-for="joke in jokes">
            <div class="item-content">
              <div class="caption">
                <p> {{joke.joke}} </p>
              </div>
            </div>
          </div>
        </div>
      
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
                  <router-link to="/posts/photolayout" class="btn btn-outline-primary btn-block" role="button">Read</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <!--Add Post modal -->
      <div id="addNewPost" class="modal fade" role="dialog">
        <div class="modal-dialog">
           <!--Add Post Content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add New Post</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input type="title" class="form-control" id="title" v-model="newPost.title">
                </div>
                <div class="form-group">
                  <label for="body">Content:</label>
                  <textarea class="form-control" rows="5" id="body" v-model="newPost.body"></textarea>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addPost()">Add</button>
            </div>
          </div>
        </div>
      </div>
      <!--modal end-->
    </div>
  </div>  
</template>
 
<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import {chuckNorrisJokes} from './http-common'

Vue.use(VueMasonryPlugin)

export default {
  name: 'Starter-Pack',
  data () {
    return {
      title: 'Starter pack for Vue-masonry and other goodies.',
      newPost: {},
      jokes: [],
      errors: [],
      posts: [{
        'user': 'Norris',
        'id': 0,
        'title': 'Chuck Norris invented Kentucky Fried..',
        'imageURL': 'http://placehold.it/300x300'
      },
      {
        'user': 'Chuck',
        'id': 1,
        'title': 'Chuck Norris has two speeds. Walk, and Kill',
        'imageURL': 'http://placehold.it/300x100'
      },
      {
        'user': 'Will',
        'id': 2,
        'title': 'iphone 4? chuck norris has iphone 8',
        'imageURL': 'http://placehold.it/300x250'
      },
      {
        'user': 'Steph',
        'id': 3,
        'title': 'Chuck Norris can slam a revolving door',
        'imageURL': 'http://placehold.it/300x150'
      }]
    }
  },
  created: function () {
    // http://api.icndb.com/jokes/random/5
    chuckNorrisJokes.get(`5`)
    .then(response => {
      let randomJokes = response.data
      this.chuckNorris(randomJokes)
      console.log(`
        Status Response: ${randomJokes.type},
        Data: ${randomJokes.value}
      `)
    })
    .catch(e => {
      this.errors.push(e)
      console.log(`Error: ${e}`)
    })
  },
  methods: {
    chuckNorris: function (result) {
      this.jokes = result.value
      console.log(`Chuck is here, your browser will now explode`)
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
  
  .container h2 {
    text-align: center;
  }
  
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
        
        .caption .mediumImgThumb {
          width: 40px;
        }
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