<template>
  <div class="container">
    <h4> {{msg}} </h4>
    
    <div v-if="$route.params.id == 'photolayout'">
      <photo-layout></photo-layout>
    </div>
    
    <div v-else class="elseComponent">
      <p>Sorry nothing here to see, click on the read button on the blog page</p>
      <img src="https://media.giphy.com/media/l1J3HBqTGW3fXBPZ6/giphy.gif"></img>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import PhotoLayout from '@/components/photo-layout'

Vue.use(VueMasonryPlugin)

export default {
  name: 'Posts',
  components: {
    PhotoLayout
  },
  data () {
    return {
      msg: 'This is the post page/route'
    }
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    text-align: center;
    padding: 2rem;
  }
  .elseComponent {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>