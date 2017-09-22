<template>
  <div id="app">
    <navbar></navbar>
    <hr>
    <div class="logos">
      <img src="./assets/swLogo.png" class="img-responsive" alt="s&w logo"> +
      <img src="./assets/vueLogo.png" class="img-responsive" alt="vue logo"> +
      <img src="./assets/masonryLogo.jpg" class="img-responsive" alt="masonry logo">
    </div>
    <hr>
    <router-view></router-view>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import navbar from './components/global/navbar'
import footerComponent from './components/global/footerComponent'

export default {
  name: 'app',
  data () {
    return {
      footer: ''
    }
  },
  components: {
    navbar,
    footerComponent
  }
}
</script>

<style lang="scss" scoped>
  @import './components/styles/global.scss';
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    
    .logos {
      text-align: center;
      
      @include mobileAndTablet {
        margin-top: 0.5rem;
      }
      
      img {
        height: 100px;
        padding: 0 1rem;
        -webkit-transition: 500ms;
        -moz-transition: 500ms;
        -ms-transition: 500ms;
        -o-transition: 500ms;
        transition: 500ms;
        
        @include mobileAndTablet {
          height: 60px;
          -webkit-transition: 500ms;
          -moz-transition: 500ms;
          -ms-transition: 500ms;
          -o-transition: 500ms;
          transition: 500ms;
        }
      }
    }
    hr {
      @include mobileAndTablet {
        display: none;
      }
    }
  }
</style>
