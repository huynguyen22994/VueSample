// import acConstant from '@/scripts/constant/acConstant'
import ProductMgmtCreate from '@/scripts/productManagement/create/productMgmtCreate'

const productMgmtUrl = '/product-management/product/create'

export default {
  productManagementCreate: {
    path: productMgmtUrl,
    name: 'ProductMangementCreate',
    component: ProductMgmtCreate
  }
}