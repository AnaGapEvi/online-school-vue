<template>
  <div>
      <b-navbar fluid="lg" style="color: black; background-color: white; position: fixed; width: 100%">
        <b-navbar-nav style="display: flex; justify-content: space-between; width: 100%" >
          <router-link to="/"  style="text-decoration: none">
            <h2 style="color: deepskyblue; margin: 5px" >OCAS</h2>
          </router-link>
          <b-nav-item-dropdown :text="email" style="margin-right: 20px" >
            <router-link class="route"   to="/user-information" >Account</router-link>
            <br>
            <button style="border: none;background-color: white" @click.prevent="logout()">Logout</button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email:'',
      role:'',
      course:''
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
            this.email = result.data.user.name
            this.role = result.data.user.role
            if(result.data.user.course){
              this.course = result.data.user.course
            }
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    logout(){
      this.axios.get('/logout').then(result => {
        localStorage.removeItem('access_token');
        this.$router.push({name: "Home"})
        // window.location.reload()

      }).catch(error => {
        return error
      })
    },
  }
}
</script>

<style scoped>
.route{
  text-decoration: none;
  color: black;
}
</style>
