<template>
    <div class="ac-ag-grid">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <ag-grid-vue style="width: 100%; height: 600px;" class="ag-theme-bootstrap"
                        :gridOptions="gridOptions"
                        :columnDefs="columnDefs"
                        :rowData="items">
                </ag-grid-vue>
            </div>
        </div>
        <div class="row ac-pagination">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <ac-pagination
                    v-bind:config="paginationConfig"
                >
                </ac-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {AgGridVue} from 'ag-grid-vue'
import ParamsComponent from './acParams.vue'
import ChildMessageComponent from './acChildMessage.vue'
import CurrencyComponent from './acCurrency.vue'
import acPagination from '../acPagination/acPagination.vue'
import acPaginationService from '../acPagination/acPagination.service'

export default {
  props: {
    config: Object,
    data: Array
  },  
  data () {
    return {
      gridOptions: null,
      columnDefs: null,
      paginationConfig: {
        pager: {
        },
        pageCustomize: {
            currentPage: 1,
            size: '10'
        }
      },
      items: []
    }
  },
  components: {
    'ag-grid-vue': AgGridVue,
    'CubeComponent': {
        render: function (h) {
            return h('span', this.valueCubed())
        },
        methods: {
            valueCubed() {
                return this.params.value * this.params.value * this.params.value;
            }
        }
    },
    ParamsComponent,
    ChildMessageComponent,
    acPagination
  },
  methods: {
    createColumnDefs() {
        this.columnDefs = this.config.attrs;
        this.gridOptions.defaultColDef = {
            headerComponentParams: {
                template: 
                  '<div class="ag-cell-label-container" role="presentation">' +
                    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
                    '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                    '  </div>' +
                    '</div>'
            }
        }
    },
    methodFromParent(cell) {
        alert(`"Parent Component Method from ${cell}!`);
    },
    setPage(page, pageSize = this.paginationConfig.pageCustomize.size) {
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
  },
  beforeMount () {
    let vm = this;  
    this.gridOptions = {
        context: {
            componentParent: this
        },
        onRowClicked: function(event) {
            console.log(event);
            console.log(vm)
        }
    };
    this.createColumnDefs();
    this.setPage(this.paginationConfig.pageCustomize.currentPage, this.paginationConfig.pageCustomize.size);
    this.paginationConfig.pager.setPage = this.setPage;
  },
  mounted() {
    this.gridOptions.api.sizeColumnsToFit();
  },
  watch: {
      'data': function(newVal, oldVal) {
        this.setPage(this.paginationConfig.pageCustomize.currentPage, this.paginationConfig.pageCustomize.size);
        this.gridOptions.api.sizeColumnsToFit();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.ac-ag-grid {
    padding: 8px;
    border: 1px rgba(0,0,0,.3) solid
}

.ag-row-hover {
    /* putting in !important so it overrides the theme's styling as it hovers the row also */
    background-color: #dfdfff !important;
}

.ag-pivot-off .ag-header-group-cell{
    font-size: 50px;
    color: red;
}

.ag-pivot-on .ag-header-group-cell{
    font-size: 25px;
    color: green;
}

.ag-cell-label-container{
    /*Necessary to allow for text to grow vertically*/
    height: 100%;

}

.ag-header-cell-label {
    /*Necessary to allow for text to grow vertically*/
    height: 100%;
    padding:0px !important;
}

.ag-header-cell-label .ag-header-cell-text{
    font-weight: bold;
}

.ag-header-container {
    border-style: solid;
    border-width: 1px;
    border-color: #c5cbce;
    background-color: #dcdcdc
}

.ac-ag-grid .ag-header {
    border: 1px rgba(0,0,0,.3) solid
}
.ac-ag-grid .ag-body {
    border: 1px rgba(0,0,0,.3) solid
}
.ac-ag-grid .ac-pagination{
    border: 1px rgba(0,0,0,.3) solid;
    max-width: 100%;
    margin-left: 1px;
}

</style>
