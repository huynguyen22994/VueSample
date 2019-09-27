<template>
    <div class="top-nav row">
       <div class="col-md-8 col-lg-8">
            <ul class="nav navbar-right">        
                <li class="dropdown" v-for="menu in menuList">
                    <a v-bind:href="'#' + menu.subApps[0].route" class="dropdown-toggle"> {{ menu.name }} <b class="fa fa-angle-down"></b></a>
                    <ul class="dropdown-menu">
                        <li v-for="subApp in menu.subApps">
                            <a v-bind:href="'#' + subApp.route" v-bind:id="`${subApp.id}`"><i class="fa fa-fw fa-user"></i> {{ subApp.name }}</a>

                        </li>
                        <li class="divider"></li>
                    </ul>
                </li>
            </ul>
       </div>
       <div class="col-md-4 col-lg-4">
            <a class="right-link" v-on:click="logout">{{ $t("log_out") }}</a>
            <label style="color: white; float: right; margin-right: 1rem">{{ currentUser.username }}</label>            
       </div>
    </div>
</template>

<script>

function logout() {
    localStorage.clear();
    window.location.href = '/login.html';
}

export default {
  data () {
    return {

    }
  },
  props: {
    menuList: Array,
    currentUser: Object
  },
  methods: {
    logout: logout
  },
  beforeMount () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navbar-right {
    float: right
}

.top-nav {
    padding: 100px 15px 0px 0rem;
    position: fixed;
    z-index: 2;
    width: 100%
}

.top-nav li {
    margin-right: 10px
}

.top-nav li>a.dropdown-toggle {
    padding-top: 10px;
    padding-bottom: 12px;
    padding-left: 10px;
    line-height: 20px;
    color: #fff;
}

.top-nav li>a:hover,
.top-nav li>a:focus,
.top-nav>a,
.top-nav a:hover,
.top-nav>a:focus {
    color: #42b983
}

.top-nav>.dropdown-menu {
    float: left;
    position: absolute;
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: #fff;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
}

.top-nav>.dropdown-menu>li>a {
    white-space: normal;
}

.dropdown:hover .dropdown-menu {
    display: block;
    float: left;
    position: absolute;
    margin-top: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #fff;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    padding-right: 7.5rem
}

.dropdown:hover .dropbtn {background-color: #3e8e41;}

.right-link {
    float: right;
    margin-right: 210px;
    color: #fff !important;
    cursor: pointer
}

</style>