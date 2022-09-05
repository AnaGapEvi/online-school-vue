<template>
  <div class="home" style="display: flex; flex-direction: column">
    <nav-bar/>
    <div class="main">
        <div class="main1" style="position: relative">
            <div style="text-align: left;position: absolute; top:40%; right: 10%">
              <p style="font-size: 35px; color: white ">The Best Learning <br> Institute </p>
              <p style="font-size: 15px; text-align: left; color: white">Successful Career Starts With Good Training</p>
            </div>
        </div>
    </div>
    <div style="height: 160px; display: flex; justify-content: center; align-items: center; padding:10px 30px" >
      <textra :data='news' :infinite='true' :timer="3.1" filter="left-right" />
    </div>
    <footer style="color: white;position: fixed; background-color: black; width: 100%; text-align: center; bottom: 0  " >
      <p style="font-size: 25px">OCAS</p>
      <p style="font-size: 10px">2020 OCAS Online Collage Assignment System</p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./custom/Navbar";

export default {
  components: { NavBar, },
  name: 'Home',
  buildModules: [ 'vue-ssr-carousel/nuxt' ],

  data () {
    return {
      data:{},
      news:[]

    }
  },
  mounted() {
    this.getNews()
  },
  methods:{
    getMy(){
         this.axios.get('/me')
           .then(result => {
             this.data = result.data.user
           }).catch(error => {
           return error
         })
    },
    getNews() {
      return new Promise((resolve, reject) => {
        this.axios.get('news').then((res) => {
          this.news = res.data.map((item => `
            <h3 style="color: white">${item.body}</h3>
          `))
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },

    logout(){
      this.axios.get('/logout').then(result => {
        localStorage.removeItem('access_token');
        // this.$router.push({name: "HelloWorld"});
        window.location.reload()
      }).catch(error => {
        return error
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  background-color: #faf7f7;
  /*min-height: 100vh;*/
}
.main{
  background-image:  url("https://media-exp1.licdn.com/dms/image/C5612AQF95DO9fuOPGQ/article-cover_image-shrink_600_2000/0/1520185245623?e=1665619200&v=beta&t=ch9CF4D5kJqJ06do-8OCq_8zXyxFKK3x_8sjJOCjIgY");
  background-size: cover;
  background-repeat: no-repeat;
  width: auto;
  height: 600px;
}
.main1{
  background-color: rgba(0, 0, 0, 0.41);
  width: 100%;
  min-height: 100vh;
}

</style>
