<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-toggleable-md navbar-light bg-faded">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!--<a class="navbar-brand" href="#">S&W</a>-->
    
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"> Blog <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/hello" class="nav-link disabled"> Hello </router-link>
          </li>
          
          <li class="nav-item">
            <router-link to="/posts" class="nav-link"> Posts </router-link>
          </li>
          
          <li class="nav-item">
            <a class="nav-link disabled" href="#"> About </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#"> Contact </a>
          </li>
        </ul>
      </div>
    </nav>
    <hr>
    <div class="logos">
      <img src="./assets/swLogo.png" class="img-responsive" alt="s&w logo"> +
      <img src="./assets/vueLogo.png" class="img-responsive" alt="vue logo"> +
      <img src="./assets/masonryLogo.jpg" class="img-responsive" alt="masonry logo">
    </div>
    <hr>
  
    <router-view></router-view>
  
    <!--Footer-->
    <div class="navbar navbar-default navbar-fixed-bottom">
      <div class="container">
        {{footer}}
      </div>
    </div>
    <!--/.Footer-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      footer: 'Hello @2017'
    }
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
    
    .navbar {
      @include mobile {
        padding: 0rem 1rem;
      }
      @include tablet {
        padding: 0rem 1rem;
      }
    }
    .navbar-toggler {
      @include mobile {
        margin-top: 1rem;
      }
      @include tablet {
        margin-top: 1rem;
      }
    }
    .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {
      color: rgba(0,0,0,1);
    }
    .navbar-fixed-bottom {
      background-color: #f7f7f7;
    }
  }
</style>
