import acConstant from '@/scripts/constant/acConstant'
import ProductMangementProduct from '@/scripts/productManagement/productManagement'

export default {
  productManagementRouteObj: {
    path: acConstant.acApp.productManagement.mainUrl,
    name: 'ProductMangement',
    component: ProductMangementProduct
  }
}