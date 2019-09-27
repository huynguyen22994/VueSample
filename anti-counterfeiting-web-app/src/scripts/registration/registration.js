var acRegistration = new Vue({
  el: '#ac-registration-app',
  data: {
    newUser: {
      email: null,
      password: null,
      username: null,
      role: null,
      firstName: null,
      lastName: null,
      name: null,
      phone: null,
      status: null,
      organization: {
        name: null,
        phone: null,
        email: null,
        address: null,
        website: null,
        type: null
      }
    },
    showSecondTab: false,
    roles: {
      manufacturer: 'manufacturer',
      retailer: 'retailer'
    },
    error: {}
  },
  methods: {
    register() {
      const vm = this;
      axios.post('http://192.168.71.76:8000/api/v1/identity/registration', this.newUser).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
        vm.error = error.response.data.errors
      })
    }
  }  
})