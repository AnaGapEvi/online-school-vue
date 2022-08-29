<template>
  <div class="nav" >
    <b-navbar size="lg" style="position: fixed;z-index: 1; width: 100%; color: white" >
    <b-navbar-nav style="width: 100%">
      <div style="display: flex; justify-content: space-between; align-items: center;width: 100% ">
        <b-nav-item><router-link to="/" style="text-decoration: none"><h2 style="color: white">OCAS</h2></router-link> </b-nav-item>
        <div>
          <b-nav-item v-if="email===''">
            <div style="color: white"  right>
              <router-link class="route" to="/"  style="margin-right: 15px" disabled="Home">Home</router-link>
              <router-link  class="route" to="/login"  style="margin-right: 15px">Login</router-link>
              <router-link class="route" to="/register"  style="margin-right: 15px">Register</router-link>
            </div>
          </b-nav-item>
          <b-nav-item  v-else>
            <div style="color: white"  right>
              <p  style="margin-right: 15px; display: inline-block" disabled="">Home</p>
              <router-link class="route"  to="/user-information" >{{email}}</router-link>
              <router-link class="route"  v-if="role ==='admin'" to="/admin-dashboard"> Dashboard </router-link>
              <router-link class="route"  v-if="role ==='teacher'" to="/teacher-dashboard"> Dashboard</router-link>
              <router-link class="route"  v-if="role ==='student'" to="/user-dashboard"> Dashboard</router-link>
<!--              <a href="/login" class="route" v-if="email!==''" @click.prevent="logout()" >Logout</a>-->
            </div>
          </b-nav-item>
        </div>
      </div>

    </b-navbar-nav>
  </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      email:'',
      role:''
    }
  },
  mounted() {
    this.getMy()
  },
  methods:{
    getMy(){
      return new Promise((resolve, reject) => {
        this.axios.get('/me')
          .then(result => {
            this.email = result.data.user.email
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    // logout(){
    //   this.axios.get('/logout').then(result => {
    //     localStorage.removeItem('access_token');
    //     this.$router.push({name: "Home"})
    //   }).catch(error => {
    //     return error
    //   })
    // },
  }
}
</script>

<style scoped>
.route{
  color:white;
  text-decoration: none;
  margin-right: 15px;
}
.route:active{
  color:deepskyblue;
}
.route:hover{
  color: black;
}

</style>
