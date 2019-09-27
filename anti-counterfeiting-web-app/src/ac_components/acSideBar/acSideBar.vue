<template>
    <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
    <div class="">
        <ul class="nav navbar-nav side-nav" v-if="!hideSideBar">
            <li>
                <label href="#" data-toggle="collapse" data-target="#submenu-1">{{ $t(currentSideBar.name) }}</label>
                <ul id="submenu-1">
                    <li v-for="subApp in currentSideBar.subApps"><a v-bind:href="'#' + subApp.route" v-bind:id="`${subApp.id}`" v-bind:class="{ 'ac-item-active': subApp.route === $route.path}"><i class="fa fa-angle-double-right"></i> {{ $t(subApp.name) }}</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- /.navbar-collapse -->
</template>

<script>

function changeSideBarList(newPath) {
    if(_.isArray(this.sideBarMenu)) {
        for(let i = 0; i < this.sideBarMenu.length; i++) {
            if(_.isArray(this.sideBarMenu[i].subApps)) {
                for(let j = 0; j < this.sideBarMenu[i].subApps.length; j++) {
                    if(this.sideBarMenu[i].subApps[j].route === newPath.path) {
                        this.hideSideBar = false;
                        this.currentSideBar = this.sideBarMenu[i];
                        return true;
                    }
                    if(newPath.path === '/') {
                        this.hideSideBar = true;
                    }
                }
            }
        }
    }
}

export default {
  props: {
    sideBarList: Array,
    sideBarObject: Object
  },  
  data () {
    return {
      sideBarMenu: this.sideBarList,
      currentSideBar: {},
      hideSideBar: false
    }
  },
  methods: {
    changeSideBarList: changeSideBarList 
  },
  beforeMount () {
      let vm = this;
      this.sideBarObject.sideBarCallback = function() {
        vm.changeSideBarList(vm.$route);
      }
     this.changeSideBarList(this.$route);
  },
  watch: {
    '$route': function(newPath, oldPath) {
        if(newPath.path !== oldPath.path) {
            this.changeSideBarList(newPath);
        }
    },
    deep: true
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media(min-width:768px) {
    .side-nav {
        position: fixed;
        top: 80px;
        left: 225px;
        width: 180px;
        margin-left: -225px;
        border: none;
        border-radius: 0;
        border-top: 1px rgba(0,0,0,.5) solid;
        overflow-y: auto;
        background-color: #2c3e50;
        /*background-color: #5A6B7D;*/
        bottom: 0;
        overflow-x: hidden;
        padding-bottom: 40px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26)
    }

    .side-nav>li>label {
        width: 225px;
        border-bottom: 1px rgba(0,0,0,.3) solid;
        display: block;
        padding: 10px 15px 10px 10px;
        text-decoration: none;
        /* color: #999; */
        color: #fff;
    }

    .side-nav li a:hover,
    .side-nav li a:focus {
        outline: none;
        background-color: #1a242f !important;
    }
}

.side-nav>li>ul {
    padding: 0;
    border-bottom: 1px rgba(0,0,0,.3) solid;
}

.side-nav>li>ul>li>a {
    display: block;
    padding: 10px 15px 10px 5px;
    text-decoration: none;
    /*color: #999;*/
    color: #fff;    
}

.side-nav>li>ul>li>a:hover {
    color: #fff;
}

.navbar .nav > li > a > .label {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  position: absolute;
  top: 14px;
  right: 6px;
  font-size: 10px;
  font-weight: normal;
  min-width: 15px;
  min-height: 15px;
  line-height: 1.0em;
  text-align: center;
  padding: 2px;
}

.navbar .nav > li > a:hover > .label {
  top: 10px;
}

.navbar-brand {
    padding: 5px 15px;
}

.ac-item-active {
    outline: none;
    background-color: #1a242f !important;
}

</style>
