<template>
  <div class="news">
    <div style="background-color: #324960" >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%" />
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
          <aside-navbar/>
        </div>
        <div style="width: 78%; margin-top: 25px; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>All Notification</h4>
            <div style="display: flex">
              <router-link to="/teacher/all-notifications" style="color: gray; text-decoration: none">All Notifications </router-link> /
              <router-link to="/teacher/new-notification" style="text-decoration: none; color: black"> New Notifications</router-link>
            </div>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content:space-evenly; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <div  v-if="role==='admin'">
              <div v-if="notification.length>0" style="width: 30%; margin: 5px; display: flex" v-for="notification in notifications"
                   :key="notification.id"
              >
                <div class="cart" style="width: 20rem;border-radius: 15px; background-color: #e0d5d5; padding: 5px">
                  <h3 style="color:white;">{{notification.title}}</h3>
                  <p style="color:white; width: 100%">
                    {{ notification.body }}
                  </p>
                  <router-link style="text-decoration: none; color: white" :to="{path: '/teacher/edit-notification/'+notification.id}">
                  <b-button variant="warning" v-if="role==='admin'">Edit</b-button>
                  </router-link>
                  <b-button variant="danger" v-if="role==='admin'" @click=deleteNotification(notification.id)> Delete </b-button>
                </div>
              </div>
              <div v-else> No notifications </div>
            </div>
            <div v-if="role==='teacher'">
              <h3>NOTIFICATIONS</h3>
              <div v-for="item in notificationCourse">
                <h5>Course: {{ item.course.name}}</h5>
                <p>Teacher: {{item.user.name}}</p>
                <p>Title: {{item.title}}</p>
                <p>Description: {{item.body}}</p>

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

export default {
  components: { AsideNavbarAdmin},

  data(){
    return{
      notifications:[],
      role:'',
      notificationCourse:[]
    }
  },
  mounted() {
    this.getMy()
    this.getNotifications()
    this.getNot()
  },
  methods:{
    getNotifications() {
      return new Promise((resolve, reject) => {
        this.axios.get('notifications').then((res) => {
          this.notifications = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getNot() {
        this.axios.get('/not').then((res) => {
          this.notificationCourse = res.data
          return res;
        }).catch((error) => {
          return (error)
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
    deleteNotification(id){
      this.axios.delete(`/delete-notification/${id}`).then(response =>{
        let i = this.notifications.map(data => data.id).indexOf(id)
        this.notifications.splice(i, 1)
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
  background-color: #e0d5d5;
}
</style>






