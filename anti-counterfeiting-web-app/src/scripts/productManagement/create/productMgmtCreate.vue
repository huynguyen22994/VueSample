<template>
  <div id="ac-registed-account">
    <div class="row">
      <div class="col-md-12">
        <ul class="breadcrumb">
          <li><a href="#">{{ $t("home") }}</a></li>
          <li>{{ $t("product_management") }}</li>
          <li>{{ $t("product") }}</li>
          <li>{{ $t("common.create") }}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-8">
          <h2>{{ $t("product") }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    {{ $t("create_product") }}
                </div>
                <div class="card-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">Serial Number:</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="newProduct.sn" class="form-control" placeholder="Enter serial number">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">*Name:</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="newProduct.props.name" class="form-control" placeholder="Enter name">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">*Color:</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="newProduct.props.color" class="form-control" placeholder="Enter color">
                                </div>
                            </div>
                        </div>                       
                        <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">*Size</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="newProduct.props.size" class="form-control" placeholder="Enter size">
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">*Price</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="number" class="form-control" id="pwd" placeholder="Enter price">
                                </div>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <div class="row ac-padding-top">
                                <div class="col-md-2">
                                    <label class="ac-pull-right">*Image</label>
                                </div>
                                <div class="col-md-8">
                                   <ac-img-upload v-bind:config="imgUploadConfig"></ac-img-upload>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> 
                <div class="card-footer">
                    <button type="submit" class="btn btn-default ac-pull-right" v-on:click="switchApp('/product-management/product')">Cancel</button>
                    <button type="submit" class="btn btn-success ac-pull-right" v-on:click="createProduct">Create</button>
                </div>
            </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import acImgUpload from '@/ac_components/acFileUpload/acImgUpload'
import acConstant from '@/scripts/constant/acConstant'
import {HTTP} from '@/ac_components/acHttp/acHttp'
import { acRedirect } from '@/ac_components/acRedirect/acRedirect';

var newProduct = {
    sn: null,
    props: {
        name: null,
        color: null,
        size: null,
        imageUrl: null
    }
}

export default {
  name: 'ProductMangementCreate',
  data () {
    return {
        newProduct: newProduct,
        imgUploadConfig: {
            isDropSelect: false,
            uploadCallBack: function (img) {
                if(img.originalname === 'Nike.jpg') {
                    newProduct.props.imageUrl = 'http://192.168.71.76:9999/upload/product_images/8276e98d3b6fa40b8a7163f136eab688.jpg'
                } else if (img.originalname === 'Casio.jpg') {
                    newProduct.props.imageUrl = 'http://192.168.71.76:9999/upload/product_images/e7fc0cce3633f4243569baa9f695b4c5.jpg'
                } else {
                    newProduct.props.imageUrl = img.url 
                }
            }
        }
    }
  },
  components: {
    acImgUpload
  },
  methods: {
    init() {

    },
    createProduct() {
        console.log(this.newProduct)
        HTTP.post('api/v1/products', {
            "sn": this.newProduct.sn,
            "props": {
                "name": this.newProduct.props.name,
                "color": this.newProduct.props.color,
                "size": this.newProduct.props.size,
                "imageUrl": this.newProduct.props.imageUrl
            }
        }).then(function(response) {
            console.log(response);
            vm.rowData = response.data
        }).catch(function(error) {
            console.log(error);
        })
    },
    switchApp(url) {
        acRedirect(url)
    }
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

.ac-panel-view {
    border: 1px rgba(0,0,0,.3) solid;
    margin-left: 1px;
    margin-right: 1px
}

.ac-panel-view .panel-heading {
    border-bottom: 1px rgba(0,0,0,.3) solid;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 12px
}

.ac-panel-view .panel-footer {
    border-top: 1px rgba(0,0,0,.3) solid;
    padding-top: 12px;
    padding-bottom: 12px;
}

.ac-pull-right {
    float: right;
    margin-left: 5px
}

.ac-padding-top {
    padding-top: 1rem
}

</style>
