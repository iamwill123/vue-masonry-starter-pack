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
        <!--<form class="form-inline my-2 my-lg-0">-->
        <!--  <input class="form-control mr-sm-2" type="text" placeholder="Search">-->
        <!--  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
        <!--</form>-->
      </div>
    </nav>
    <hr>
    <div class="sw-logo">
      <img src="./assets/swLogo.png" class="img-responsive" alt="steph and will logo">
    </div>
    <hr>
  
    <router-view></router-view>
  
    <!--Footer-->
    <footer class="navbar navbar-default navbar-fixed-bottom">
      <div class="container">
        <p class="navbar-text pull-left">©2017</p>
      </div>
    </footer>
    <!--/.Footer-->
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" scoped>
  @import './components/styles/global.scss';
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
    .sw-logo {
      text-align: center;
      
      @include mobileAndTablet {
        margin-top: 0.5rem;
      }
      
      img {
        width: 100px;
        -webkit-transition: 500ms;
        -moz-transition: 500ms;
        -ms-transition: 500ms;
        -o-transition: 500ms;
        transition: 500ms;
        
        @include mobileAndTablet {
          width: 60px;
          -webkit-transition: 500ms;
          -moz-transition: 500ms;
          -ms-transition: 500ms;
          -o-transition: 500ms;
          transition: 500ms;
        }
      }
    }
    hr[data-v-5f2bf094] {
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
    footer {
      background-color: #f7f7f7;
    }
  }
</style>
