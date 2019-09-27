<template>
  <div id="ac-registed-account">
    <div class="row">
      <div class="col-md-12">
        <ul class="breadcrumb">
          <li><a href="#">{{ $t("home") }}</a></li>
          <li>{{ $t("product_management") }}</li>
          <li>{{ $t("product") }}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-8">
          <h2>{{ $t("product") }}</h2>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-4">
        <div id="ac-list-button">
          <ul>
            <li>
              <button class="btn btn-default" v-on:click="switchApp('/product-management/product/create')"> {{ $t("common.add") }} </button>
            </li>
            <li>
              <button class="btn btn-default"> {{ $t("common.update") }} </button>
            </li>
            <li>
              <button class="btn btn-default"> {{ $t("common.delete") }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        
        <ac-panel-view v-bind:config="acPanelViewConfig" v-bind:data="productList"></ac-panel-view>

      </div>
    </div>
  </div>
</template>

<script>
import acPanelView from '@/ac_components/acPanelView/acPanelView'
import {HTTP} from '@/ac_components/acHttp/acHttp'
import { acRedirect } from '@/ac_components/acRedirect/acRedirect';

var acPanelViewConfig = {
  titleKey: 'Key',
  imageKey: 'Record.props.imageUrl',
  attrs: [
    {
      titleName: 'Name',
      key: 'Record.props.name'
    },
    {
      titleName: 'Color',
      key: 'Record.props.color'
    },
    {
      titleName: 'Size',
      key: 'Record.props.size'
    }
  ],
  detailAttrs: [
    {
      titleName: 'Serial Number',
      key: 'Key'
    },
    {
      titleName: 'Name',
      key: 'Record.props.name'
    },
    {
      titleName: 'Color',
      key: 'Record.props.color'
    },
    {
      titleName: 'Size',
      key: 'Record.props.size'
    },
    {
      titleName: 'Image',
      key: 'Record.props.imageUrl',
      isImage: true
    }    
  ]
}

function getProductList() {
  let vm = this;

  vm.productList = [
    {
        "Key": "SN0020",
        "Record": {
            "creator": "lakhang@email.com",
            "isPublicAccess": true,
            "lastOperationData": {
                "action": "CREATE",
                "submitter": "lakhang@email.com"
            },
            "owner": "lakhang@email.com",
            "ownerChain": [
                "lakhang@email.com"
            ],
            "props": {
                "color": "red",
                "imageHash": "ffffffffffdfff8fff09fe09fc01f001f801c001803ffffb00000001ffffffff",
                "imageUrl": "https://sneakerbardetroit.com/wp-content/uploads/2017/08/nike-air-force-1-low-all-over-logo-red-ah8462-600-1.jpg",
                "name": "Adidas Neo Supper 20",
                "size": "44"
            },
            "sn": "SN0020"
        }
    },
    {
        "Key": "SN0021",
        "Record": {
            "creator": "lakhang@email.com",
            "isPublicAccess": true,
            "lastOperationData": {
                "action": "CREATE",
                "submitter": "lakhang@email.com"
            },
            "owner": "lakhang@email.com",
            "ownerChain": [
                "lakhang@email.com"
            ],
            "props": {
                "color": "blue",
                "imageHash": "ffffffffffdfff8fff09fe09fc01f001f801c001803ffffb00000001ffffffff",
                "imageUrl": "https://sneakerbardetroit.com/wp-content/uploads/2017/08/nike-air-force-1-low-all-over-logo-red-ah8462-600-1.jpg",
                "name": "Nike Neo Supper 20",
                "size": "44"
            },
            "sn": "SN0021"
        }
    }
]

  // HTTP.get('api/v1/products').then(function(response) {
    
  //   let productList = response.data;
  //   if(productList && productList.length > 0) {
  //     vm.productList = productList;
  //   }

  // }).catch(function(error) {
  //   console.log(error)
  // })
}

export default {
  name: 'ProductMangement',
  data () {
    return {
      acPanelViewConfig: acPanelViewConfig,
      productList: []
    }
  },
  components: {
    acPanelView
  },
  methods: {
    init() {
        this.getProductList();
    },
    switchApp(url) {
      acRedirect(url)
    },
    getProductList: getProductList
  },
  beforeMount () {
    this.init();
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
