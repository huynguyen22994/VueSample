<template>
    <div class="row" >
        <div class="col-md-6 col-sm-8 col-xs-8">
            <div class="page-nation">
                <ul class="pagination pagination-large">
                    <li
                    >
                        <button class="pagination-button"
                            :disabled="config.pager.currentPage === 1"
                            v-on:click="setPaging(1, config.pageCustomize.size)"
                        >
                            &lt;&lt;
                        </button>
                    </li>
                    <li
                    >
                        <button class="pagination-button"
                        :disabled="config.pager.currentPage === 1"
                            v-on:click="setPaging(config.pager.currentPage - 1, config.pageCustomize.size)"
                        >
                            &lt;
                        </button>
                    </li>
                    <li 
                        v-for="page in config.pager.pages"
                        v-bind:class="{ active: config.pager.currentPage === page }"    
                    >
                        <button class="pagination-button"
                            v-on:click="setPaging(page, config.pageCustomize.size)"
                        >
                            {{page}}
                        </button>
                    </li>
                    <li
                    >
                        <button class="pagination-button"
                            :disabled="config.pager.currentPage === config.pager.totalPages"
                            v-on:click="setPaging(config.pager.currentPage + 1, config.pageCustomize.size)"
                        >
                            &gt;
                        </button>
                    </li>
                    <li
                    >
                        <button class="pagination-button"
                            :disabled="config.pager.currentPage === config.pager.totalPages"
                            v-on:click="setPaging(config.pager.totalPages, config.pageCustomize.size)"
                        >
                            &gt;&gt;
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Drop down-->
        <div class="col-md-6 col-sm-4 col-xs-4">
            <select
                class="dropdown-setpage" 
                v-model="config.pageCustomize.size"
                v-on:change="selectItemNumber(config.pageCustomize.currentPage, config.pageCustomize.size)"
                title=""
            >
                <option  
                    v-for="dropNumber in pageDropNumber" 
                    v-bind:value="dropNumber.id"
                >
                    {{ dropNumber.name }}
                </option>
            </select>
        </div>
        <!-- Drop down -->
    </div>
</template>

<script>

export default {
    props: {
        config: Object
    },
  data () {
    return {
      pageDropNumber: [            
        { 
            id: 5,
            name: '5'
        },
        {
            id: 10,
            name: '10'
        },
        {
            id: 15,
            name: '15'
        },
        {
            id: 20,
            name: '20'
        }
    ],

    }
  },
  methods: {
    active() {
        if(this.config.pager.setPage) {
            this.setPaging = this.config.pager.setPage;
        } else {
            this.setPageDefault();
        }
    },
    selectItemNumber(current, number) {
        if(current && number) {
            this.setPaging(current, number);
        } else {
            return;
        }    
    },
    setPageDefault(page) {
        console.log('please define setPage function in pager');
    }
  },
  beforeMount () {
    this.active();
  },
  mounted () {

  },
  watch: {
      'config.pager': function(newVal, oldVal) {
          this.config.pager = newVal;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.dropdown-setpage {
    display: block;
    height: 34px;
    margin-top: 5px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #42b983;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    float: right;
    cursor: pointer
}
.pagination-button {
    display: block;
    height: 34px;
    margin-top: 5px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #42b983;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    float: left;
    cursor: pointer
}
.pagination-button:hover {
    background-color: #42b983;
    color: #fff;
}

button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

button[disabled]:hover{
  background-color: #cccccc;
  color: #666666;
}
li.active button{
    background-color: #42b983;
    color: #fff;
}
</style>
