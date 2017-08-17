import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Hello from '@/components/Hello'
import Blog from '@/components/Blog'
import Posts from '@/components/Posts'
import PhotoLayout from '@/components/photo-layout'

Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Blog },
    { path: '/hello', component: Hello },
    { path: '/posts/:id',
      component: Posts,
      children: [
        {
          path: '',
          component: PhotoLayout
        }
      ]
    }
  ]
})

// <!--check out https://vuetifyjs.com/vuetify-->
