<template>
    <div class="navbar-header">
        <a class="navbar-brand" href="">
            <img src="/assets/logo.png">
        </a>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand {
    padding: 0px 15px;
}
.navbar-header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 0;
    border-top: 1px rgba(0,0,0,.5) solid;
    background-color: #2c3e50;
    z-index: 2;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26) 
}
.navbar-header .navbar-brand img {
    width: 80px;
    height: 80px;
}
</style>
