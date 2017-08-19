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
      </div>
      
      <div v-for="feed in feeds.items" v-if="$route.params.id == 4">
        <div class="caption">
          <h3> {{ feed.title | uppercase }} </h3>
          <p> by: {{ feed.author }} </p>
          <p> {{ feed.pubDate | formatDate }} </p>
          <div v-html="feed.description"></div>
          <p> Route-id: {{ $route.params.id }} </p>
          <!--<p> Post-id: {{ post.id }} </p>-->
        </div>
      </div>
      <!--<div v-if="$route.params.id">-->
      <!--  <div class="caption">-->
      <!--    <h3> {{ posts[$route.params.id].title | uppercase }} </h3>-->
      <!--    <p> by: {{ posts[$route.params.id].user }} </p>-->
      <!--    <p> {{ posts[$route.params.id].body }} </p>-->
          
      <!--    <p> post id: {{ $route.params.id }} </p>-->
      <!--  </div>-->
      <!--</div>-->
      <div v-else class="post-navigation">
        <p>Check out: {{post.id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoLayout from '@/components/photo-layout'
import {RSS2JSON} from './http-common'

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
   .post-navigation {
      display: block;
      bottom: 0;
   }
</style>