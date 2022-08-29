<template>
  <div class="news">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
          <aside-navbar/>
        </div>
        <div style="width: 78%; margin-top: 25px; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>All Announcement</h4>
            <router-link to="/new-announcement" v-if="role==='admin'">New Announcement</router-link>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <div style="margin: 5px" v-for="item in announcements"
                 :key="item.id"
            >
              <div class="cart" style="width: 20rem;border-radius: 15px; background-color: #e0d5d5; padding: 5px">
                <h3 style="color:black; text-align: right">{{item.title}}</h3>
                <p style="color:black; text-align: right; width: 100%">
                  {{ item.body }}
                </p>

                <b-button variant="warning" v-if="role==='admin'"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-announcement/'+item.id}">Edit</router-link>  </b-button>
                <b-button variant="danger" v-if="role==='admin'" @click=deleteAnnouncement(item.id)> Delete </b-button>
              </div>            </div>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideNavbarAdmin from "../custom/AsideNavbarAdmin";
import OneAnnouncement from "./OneAnnouncement";

export default {
  ////////////////////// posel announcement
  components: {OneAnnouncement,  AsideNavbarAdmin},
  data(){
    return{
      announcements:{},
      role:''
    }
  },
  created() {
  },
  mounted() {
    this.getAnnouncements()
    this.getMy()
  },
  methods:{
    getAnnouncements() {
      return new Promise((resolve, reject) => {
        this.axios.get('announcement').then((res) => {
          this.announcements = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteAnnouncement(id){
      this.axios.delete(`/delete-announcement/${id}`).then(response =>{
        let i = this.announcements.map(data => data.id).indexOf(id)
        this.announcements.splice(i, 1)
        return response
      }).catch(e =>{
        return e
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



