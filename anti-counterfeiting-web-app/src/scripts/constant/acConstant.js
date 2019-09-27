export default {
  acApp: {
    registedAccount: {
      name: 'REGISTED ACCOUNT',
      id: 'registed-account',  
      home: {
        id: 'registed-account-home',
        route: '/registed-account',
        name: 'Home'
      }
    },
    organization: {
      name: 'ORGANIZATION',
      id: 'organization',  
      home: {
        id: 'organization-home',
        route: '/organization',
        name: 'Home'
      },
      test: {
        id: 'organization-test',
        route: '/test',
        name: 'test'
      },
      test2: {
        id: 'organization-test2',
        route: '/test2',
        name: 'test2'
      }
    },
    productManagement: {
      name: 'PRODUCT MANAGEMENT',
      id: 'product_management',  
      mainUrl: '/product-management/product',
      product: {
        id: 'product-management-product',
        route: '/product-management/product',
        name: 'Product'
      },
      category: {
        id: 'organization-test',
        route: 'product_management/category',
        name: 'Category'
      }
    },
    retailerManagement: {
      name: 'RETAILER MANAGEMENT',
      id: 'retailer_management',
      mainUrl: '/retailer-management/retailer',
      retailer: {
        id: 'retailer-management-product',
        route: '/retailer-management/retailer',
        name: 'Retailer'
      }
    },
    orderManagement: {
      name: 'ORDER MANAGEMENT',
      id: 'order_management',
      mainUrl: '/order-management/order',
      retailer: {
        id: 'order-management-product',
        route: '/order-management/order',
        name: 'Order'
      }
    }
  },
  permissionRoleApp: {
    admin: ['registed-account', 'organization'],
    organization: ['retailer_management', 'product_management', 'order_management'],
    retailer: []
  }
}