<template>
  <div class="news">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%" />
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
          <aside-navbar/>
        </div>
        <div style="width: 78%; margin-top: 25px; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>All news</h4>
            <router-link to="/create-news" v-if="role==='admin'">Create news</router-link>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <div style="margin: 5px" v-for="item in news"
                 :key="item.id"
            >
              <div class="cart" style="padding: 15px; width: 20rem;border-radius: 15px; background-color: #324960; color: white;">
                <h3>{{item.title}}</h3>
                <p style="width: 100%">
                  {{ item.body }}
                </p>
                <b-button variant="warning" v-if="role==='admin'"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-news/'+item.id}">Edit</router-link>  </b-button>
                <b-button variant="danger" v-if="role==='admin'" @click=deleteNews(item.id)> Delete </b-button>
              </div>
            </div>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideNavbarAdmin from "../custom/AsideNavbarAdmin";
import OneNews from "./OneNews";

export default {
  components: {OneNews, AsideNavbarAdmin},
    data(){
      return{
        news:[],
        role:''
      }
    },
  mounted() {
    this.getNews()
    this.getMy()
  },
  methods:{
    getNews() {
      return new Promise((resolve, reject) => {
        this.axios.get('news').then((res) => {
          this.news = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getMy() {
      return new Promise((resolve, reject) => {
        this.axios.get('/me')
          .then(result => {
            // this.email = result.data.user.email
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    deleteNews(id){
      this.axios.delete(`/delete-news/${id}`).then(response =>{
        let i = this.news.map(data => data.id).indexOf(id)
        this.news.splice(i, 1)
        return response
      }).catch(e =>{
        return e
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news{
  /*display: flex;*/
  /*justify-content: ;*/
  /*align-items: center;*/
  min-height: 100vh;
  background-color: #324960;
}
</style>






