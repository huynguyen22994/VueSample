<template>
  <div id="ac-registed-account">
    <div class="row">
      <div class="col-md-12">
        <ul class="breadcrumb">
          <li><a href="#">{{ $t("home") }}</a></li>
          <li>{{ $t("register_account") }}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-8">
          <h2>{{ $t("register_account") }}</h2>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-4">
        <div id="ac-list-button">
          <ul>
            <li>
              <button class="btn btn-default"> {{ $t("approve") }} </button>
            </li>
            <li>
              <button class="btn btn-default"> {{ $t("refuse") }} </button>
            </li>
            <li>
              <button class="btn btn-default"> {{ $t("active") }}</button>
            </li>
            <li>
              <button class="btn btn-default"> {{ $t("inactive") }} </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
         <ac-ag-grid v-bind:config="agGridConfig" v-bind:data="rowData"></ac-ag-grid>
      </div>
    </div>
  </div>
</template>

<script>
import acAgGrid from '@/ac_components/acAgGrid/acAgGrid'
import {HTTP} from '@/ac_components/acHttp/acHttp'

var agGridConfig = {
  attrs: [
          {
            headerName: "User Name", 
            field: "username", 
            width: 100
          },
          {
              headerName: "Last Name",
              field: "lastName",
              editable: true,
              colId: "square",
              // width: 100
          },
          {
              headerName: "Status",
              field: "status",
              colId: "cube",
              // width: 100
          },
          {
              headerName: "Phone",
              field: "phone",
              colId: "cube",
              // width: 100
          },
          {
              headerName: "Email",
              field: "email",
              colId: "cube",
              // width: 100
          },
          {
              headerName: "Role",
              field: "role",
              colId: "cube",
              // width: 100
          },
          {
              headerName: "Organization Id",
              field: "organizationId",
              colId: "cube",
              // width: 100
          }
      ]
};

export default {
  name: 'RegistedAccount',
  data () {
    return {
      title: 'Registered Account',
      agGridConfig: agGridConfig,
      rowData: []
    }
  },
  components: {
    acAgGrid
  },
  methods: {
    createRowData () {
      const rowData = [];
      for (let i = 0; i < 15; i++) {
          rowData.push({
              row: "Row " + i,
              value: i,
              currency: i + Number(Math.random().toFixed(2))
          });
      }
      this.rowData = rowData;
    },
    getRegistedAccount () {
      const vm = this
      HTTP.get('api/v1/identity/accounts/verification').then(function(response) {
        console.log(response);
        vm.rowData = response.data
      }).catch(function(error) {
        console.log(error);
      })
    }
  },
  beforeMount () {
    this.getRegistedAccount();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul.breadcrumb {
    padding: 3px 12px;
    list-style: none;
    background-color: #fff;
    border-bottom: 1px #cccc solid
}
ul.breadcrumb li {
    display: inline;
    font-size: 18px;
}
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}
ul.breadcrumb li a {
    color: #42b983;
    text-decoration: none;
}
ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}

#ac-list-button ul {
  float: right;
  margin-top: 10px;
  padding:0;
}
#ac-list-button ul li{
  list-style-type:none;
  display:inline;
  float: left;
  padding:0;
  margin-left: 5px
}

#ac-list-button ul li button {
  display:block;
}


</style>
