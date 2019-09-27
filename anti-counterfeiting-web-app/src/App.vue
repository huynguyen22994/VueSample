<template>
  <div id="app">
    <div id="wrapper" class="ac_app_wrapper">
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <ac-navigation></ac-navigation>
        <ac-navigation-right v-bind:menu-list="menuList" v-bind:current-user="currentUser"></ac-navigation-right>
        <ac-side-bar v-bind:side-bar-list="menuList" v-bind:side-bar-object="sideBarObject"></ac-side-bar>
      </nav>
    </div>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row" id="main" >
                <div class="col-sm-12 col-md-12 well" id="content">
                   <router-view/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import acConstant from '@/scripts/constant/acConstant'
import acSideBar from '@/ac_components/acSideBar/acSideBar'
import acNavigation from '@/ac_components/acNavigation/acNavigation'
import acNavigationRight from '@/ac_components/acNavigationRight/acNavigationRight'
import {HTTP} from '@/ac_components/acHttp/acHttp'


function getUserInfor() {
  let vm = this;
 var promise = new Promise(function(resolve, reject) { 
    HTTP.get('/auth/me').then(function(response) {
      let userInfor = _.get(response, 'data');
      vm.currentUser = userInfor;
      resolve(userInfor);
    }).catch(function(error) {
      reject(error);
    })
 })
 return promise;
}

export default {
  name: 'App',
  components: {
    acSideBar,
    acNavigation,
    acNavigationRight
  },
  data () {
    return {
      menuList: [],
      currentUser: {},
      sideBarObject: {}
    }
  },
  methods: {
      init () {
        var vm = this;
        //this.getUserInfor().then(function(userInfor) {
          vm.parseMenu();
          if(_.isFunction(vm.sideBarObject.sideBarCallback)) {
            vm.sideBarObject.sideBarCallback();
          }
          console.log(vm.sideBarObject)
        //})
      },
      parseMenu () {
        let perRoleApps = [];
        // if(this.currentUser.role === '5b3c947311a87a641af010be') {
        //   perRoleApps = perRoleApps.concat(acConstant.permissionRoleApp.admin);
        // } else if (this.currentUser.role === '5b3c947311a87a641af010bc') {
          perRoleApps = perRoleApps.concat(acConstant.permissionRoleApp.organization);
        //}

        for(let prop in acConstant.acApp) {
            let app = {
                name: acConstant.acApp[prop].name,
                id: acConstant.acApp[prop].id,
                subApps: []
            }
            for(let subProp in acConstant.acApp[prop]) {
                if(subProp !== 'name' && subProp !== 'id' && subProp !== 'mainUrl') {
                    acConstant.acApp[prop][subProp].parentId = acConstant.acApp[prop].id;
                    app.subApps.push(acConstant.acApp[prop][subProp]);
                }
            }

            for(let i = 0; i < perRoleApps.length; i++) {
              if(app.id === perRoleApps[i]) {
                this.menuList.push(app);
              }
            }
        }
    },
    getUserInfor: getUserInfor
  },
  beforeMount () {
    this.init();
  },
  watch: {

  }
}
</script>

<style>
@import url('../node_modules/ag-grid/dist/styles/ag-grid.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-fresh.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-balham.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-balham-dark.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-blue.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-bootstrap.css');
@import url('../node_modules/ag-grid/dist/styles/ag-theme-material.css');
#page-wrapper {
  width: 100%;        
  padding: 0;
  background-color: #fff;
}
@media(min-width:768px) {
    #wrapper {
        padding-left: 225px;
    }

    #page-wrapper {
      padding-left: 180px;
      padding-top: 80px;
    }
}
</style>
