<template>
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
          <router-link to="/hello" class="nav-link"> Hello </router-link>
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
</template>
<style lang="scss" scoped>
  @import '../styles/global.scss';
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
</style>