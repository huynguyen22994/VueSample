// const myApi = axios.create({
//   baseURL: 'http://localhost:9999',
//   withCredentials: true,
//   transformRequest: [(data) => {
//     let formData = new FormData()
//     Object.keys(data).forEach(attr => {
//       formData.append(attr, data[attr])
//     })
//     return data.body
//   }],
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   }
// })

var acLogin = new Vue({
  el: '#ac-login-app',
  data: {
    userObj: {
      id: null,
      password: null  
    },
    confirmMsg: '',
    isLoginFail: false,
    showSpinner: false
  },
  methods: {
    login () {
      let vm = this
      vm.showSpinner = true
      // axios.defaults.headers.common['x-auth-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViM2M5NTJjMTFhODdhNjQxYWYwMTBjYSIsImlhdCI6MTUzMDc3NzkwMSwiZXhwIjoxNTMwNzg1MTAxfQ.4Ek00U0nGxTbV6Fv-x_XAvJoaNHxaiR_y01ltcMP1Wc'
      axios.defaults.headers.common['username'] = this.userObj.id
      axios.defaults.headers.common['password'] = this.userObj.password

      axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response
      }, function (error) {
        // Do something with response error
        return Promise.reject(error)
      })

      axios.post('http://192.168.71.76:8000/auth/login', {
        username: this.userObj.id,
        password: this.userObj.password
      }).then(function (response, request) {
        var data = response.data
        if (data) {
          localStorage.setItem('x-auth-token', data)
          window.location.href = '/'
        } else {
          window.location.href = '/login.html'
        } 
        vm.showSpinner = false
      }).catch(function (error) {
        vm.isLoginFail = true
        vm.confirmMsg = 'Error: Sign in Fail'
        vm.showSpinner = false
        console.log(error)
      })
    }
  }  
})