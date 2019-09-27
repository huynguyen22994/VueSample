<template>
    <div class="row">
        <div v-bind:class="itemPanelClass">
            <div class="ac-panel-view">
                <span>All {{ data.length }} entries</span>
                <div class="ac-panel-view ac-overlow row" v-if="hasData">
                    <div class="col-sm-6 col-md-3 col-lg-3 ac-item-panel" v-for="product in items" v-on:click="getCurrentItem(product)" v-bind:class="{ 'ac-item-active': product.Key === currentItem.Key}">    
                        <div class="panel panel-warning">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-4 col-md-4 col-lg-4">
                                        <img v-bind:src="queryData(product, config.imageKey)" class="img-responsive img-rounded" alt="Cinque Terre" width="110" height="110"> 
                                    </div>
                                    <div class="col-sm-8 col-md-8 col-lg-8 ac-panel-infor">
                                        <label>{{ product[config.titleKey] }}</label>
                                       <p v-for="attr in config.attrs"><span><b>{{attr.titleName}}:</b> {{ queryData(product, attr.key) }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ac-panel-view ac-overlow row" v-if="!hasData">
                    <div class="ac-panel-view ac-no-data">
                        No Data To Show
                    </div>
                </div>
                <div class="row ac-pagination-pane-view">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <ac-pagination
                            v-bind:config="paginationConfig"
                        >
                        </ac-pagination>
                    </div>
                </div>
            </div>
        </div>

        <div v-bind:class="itemDetailClass">
            <div class="ac-panel-view">
                <a class="ac-hide-detail" v-on:click="hideDetail">Hide Detail</a>
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4>

                        </h4>
                    </div>
                    <div class="panel-body">
                        <form>
                            <div class="form-group" v-for="detailAttr in config.detailAttrs">
                                <label><b>{{ detailAttr.titleName }}:</b></label>
                                <!-- <input v-if="!detailAttr.isImage" type="text" class="form-control" disabled="true" v-model="currentItem[detailAttr.key]"> -->
                                <p v-if="!detailAttr.isImage"> {{queryData(currentItem, detailAttr.key)}} </p>
                                <div v-if="detailAttr.isImage">
                                    <img v-bind:src="queryData(currentItem, detailAttr.key)" class="img-responsive img-rounded" width="150" height="150"> 
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import acPagination from '../acPagination/acPagination.vue'
import acPaginationService from '../acPagination/acPagination.service'

const showDetailObj = {
    itemPanelClass: ['col-md-10'],
    itemDetailClass: ['col-md-2', 'ac-tab-detail']
}

const hideDetailObj = {
    itemPanelClass: ['col-md-12'],
    itemDetailClass: ['hide-detail']
}
function toggleDetail(vm) {
    if (vm.isShowDetail) {
        vm.itemPanelClass = showDetailObj.itemPanelClass;
        vm.itemDetailClass = showDetailObj.itemDetailClass;
    } else {
        vm.itemPanelClass = hideDetailObj.itemPanelClass;
        vm.itemDetailClass = hideDetailObj.itemDetailClass;
        vm.currentItem = {};
    }
    vm.isShowDetail = !vm.isShowDetail;
}
function getCurrentItem(currentItem) {
    let vm = this;
    if(vm.currentItem[vm.config.titleKey] === currentItem[vm.config.titleKey]) {
        toggleDetail(vm);    
    } else {
        vm.currentItem = currentItem;
        vm.itemPanelClass = showDetailObj.itemPanelClass;
        vm.itemDetailClass = showDetailObj.itemDetailClass;
        vm.isShowDetail = true;
    }

}

function setPage(page, pageSize = this.paginationConfig.pageCustomize.size) {
    this.paginationConfig.pageCustomize.size = pageSize;
    this.paginationConfig.pageCustomize.currentPage = page;
    if(page < 1 || page > this.paginationConfig.pager.totalPages) {
        return;
    }
    if(this.data.length > 0) {
        this.paginationConfig.hasResult = true;
        this.paginationConfig.pager = acPaginationService.getPager(this.data.length, page, pageSize);
        
        this.items = this.data.slice(this.paginationConfig.pager.startIndex, this.paginationConfig.pager.endIndex);
    } else {
        this.paginationConfig.hasResult = false;
    }
}

function hideDetail() {
    var vm = this;
    this.toggleDetail(vm);
}

export default {
  data () {
    return {
        hasData: false,
        isShowDetail: false,
        itemPanelClass: hideDetailObj.itemPanelClass,
        itemDetailClass: hideDetailObj.itemDetailClass,
        currentItem: {},
        paginationConfig: {
            pager: {
            },
            pageCustomize: {
                currentPage: 1,
                size: '10'
            }
        }
    }
  },
  props: {
    config: Object,
    data: Array
  },
  components: {
    acPagination
  },
  methods: {
      toggleDetail: toggleDetail,
      getCurrentItem: getCurrentItem,
      setPage: setPage,
      hideDetail: hideDetail,
      queryData: function(item, exp) {
          return _.get(item, exp);
      }
  },
  beforeMount () {
    this.setPage(this.paginationConfig.pageCustomize.currentPage, this.paginationConfig.pageCustomize.size);
    this.paginationConfig.pager.setPage = this.setPage;
    this.hasData = (this.data.length > 0) ? true : false; 
  },
  watch: {
    'data': function(newVal, oldVal) {
        this.setPage(this.paginationConfig.pageCustomize.currentPage, this.paginationConfig.pageCustomize.size);
        this.paginationConfig.pager.setPage = this.setPage;
        this.hasData = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.ac-panel-view {
    padding: 12px;
    border: 1px rgba(0,0,0,.3) solid;
    margin-left: 1px;
    margin-right: 1px
}

.ac-panel-view .panel {
        border: 1px rgba(0,0,0,.3) solid;
        padding: 7px;
        margin-top: 4px;
        margin-bottom: 4px
}

.ac-panel-infor {

}

.ac-panel-infor p {
    margin-bottom: 0rem
}

.ac-panel-infor label {
    font-weight: bold
}

.ac-item-panel {
    padding-right: 4px;
    padding-left: 4px;
}

.ac-item-panel:hover {
    cursor: pointer;
    box-shadow: 2px 2px 4px #000000;
}

.ac-tab-detail {
    padding-left: 0px
}

.hide-detail {
    display: none
}
.ac-pagination-pane-view{
    border: 0.5px rgba(0,0,0,.3) solid;
    max-width: 100%;
    margin-left: 1px;
}

.ac-item-active {
    color: brown;
    background-color: beige;
}

.ac-hide-detail {
    color: cornflowerblue !important;
    cursor: pointer
}

.ac-no-data {
    margin-left: 40%
}

</style>