import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/ac_components/HelloWorld/HelloWorld'
import RegistedAccount from '../scripts/registedAccount/registedAccount.route'
import Organization from '../scripts/organization/organization.route'
import ProductManagement from '../scripts/productManagement/productManagement.route'
import ProductMgmtCreate from '../scripts/productManagement/create/productMgmtCreate.route'
import RetailerMgmt from '../scripts/retailerManagement/retailerManagement.route'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    RegistedAccount.registedRouteObj,
    Organization.organizationRouteObj,
    ProductManagement.productManagementRouteObj,
    ProductMgmtCreate.productManagementCreate,
    RetailerMgmt.retailerMgmtRouteObj
  ]
})
