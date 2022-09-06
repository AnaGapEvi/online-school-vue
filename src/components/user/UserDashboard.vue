<template>
    <div class="dashboard">
      <dashboard-nav />
      <div style="width: 100%;background-color: #324960;padding-top: 70px; margin: 0px auto">
          <div style="box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);margin: 25px; padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
            <h4 style="text-align: center">News</h4> <hr>
            <div  v-for="item in news" class="box">
                <h4>{{item.title}}</h4>
                <h6>{{item.body}}</h6>
            </div>
          </div>
          <div style="box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);margin: 25px;padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
            <h4 style="text-align: center">Announcement</h4><hr>
            <div class="box" v-for="item in announcements">
              <h4 style="color: green">{{item.title}}</h4>
              <h6>{{item.body}}</h6>
            </div>
          </div>
          <div style="box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);margin: 25px;padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
            <h4 style="text-align: center">Notifications</h4><hr>
            <div style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1); width: 80%; margin: 20px auto; text-align: center; padding: 10px" v-for="notification in notifications">
              {{notifications.name}}
              <div style="color: black" v-for="course in notification.courses">
                  <h4 v-if="course.notifications.length">{{course.name}}</h4>
                  <h4 v-else> not new notification in {{course.name}}</h4>

                <div class="box"  v-for="item in course.notifications">
                  <p>{{item.title}}</p>
                  <p>{{item.body}}</p>
                  <p>teacher: {{item.user.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <div style="box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);margin: 25px;padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
            <h4 >Courses</h4>
            <router-link to="/course-participants">All Courses</router-link>
            <hr>
            <div v-for="i in userCourses">
              <div v-for="item in i.courses">
                <h6>{{item.name}}</h6>
              </div>
            </div>
          </div>
          <div style="margin: 25px 25px; box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
           <div class="d-flex flex-wrap justify-content-between">
             <h4>Assignments</h4>
             <router-link to="/checked-assignments">Answers</router-link>
           </div>
            <hr>
            <div v-for="item in assignments" style="display: flex;flex-wrap: wrap; padding: 10px; margin: 5px; justify-content: space-evenly">
              <div v-for="z in item.courses" style="width: 40%; padding: 15px;box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 1); margin: 5px ">
                  <h4 v-if="z.tasks.length ">{{z.name}}</h4>
                  <h5 v-else>Not new Tasks {{z.name}}</h5>
                    <hr>
                    <div v-for="y in z.tasks" style=" padding: 15px; margin: 5px ">
                      <label>Title: </label>
                      <h5> <b>{{y.title}}</b></h5>
                      <hr>
                      <label>Description: </label>
                      <p> {{y.description}}</p>
                      <hr>
                      <label>Marks: </label>
                      <p> {{y.mark}}</p>
                      <hr>
                      <label>Deadline: </label>
                      <p> {{y.date}}</p>
                      <expandable-image :src="`http://127.0.0.1:8000/`+y.file" class="shadow-lg p-3 bg-white rounded image" height="100%" width="100%" />
                      <router-link :to="{path: '/answer-task/'+y.id}"><b-button  style="width: 100%; margin: 5px" variant="warning">to answer</b-button></router-link>
                    </div>
              </div>
            </div>
          </div>
        </div>
      <footer> <p>This dashboard was generated on OCAS </p></footer>
    </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  components: {},

  data () {
    return {
      error:'',
      announcements:[],
      news:[],
      assignments:[],
      userCourses:[],
      notifications:[]
    }
  },
  mounted() {
    this.log()
    this.getAnnouncements()
    this.getNews()
    this.getAssignment()
    this.getCourse()
    this.getNotifications()
  },
  methods:{
    log(){
      this.axios.post('log', {pageName:'User Dashboard'}).then(resp => {
        return resp
      }).catch(e =>{
        return e
      })
    },
    getNotifications(){
      return new Promise((resolve, reject) => {
        this.axios.get('/notifications-course').then((res) => {
          this.notifications = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getCourse(){
      return new Promise((resolve, reject) => {
        this.axios.get('/get-user-task').then((res) => {
          this.userCourses = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    onImageChange(e){
      this.file = e.target.files[0];
    },
    getAssignment(){
      return new Promise((resolve, reject) => {
        this.axios.get('/user-tasks-list').then((res) => {
          this.assignments = res.data
          return resolve(true);

        }).catch((error) => {
          return reject(error)
        })
      })
    },
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
    getNews() {
      return new Promise((resolve, reject) => {
        this.axios.get('news').then((res) => {
          this.news = res.data
          return resolve(true);
        }).catch((error) => {box
          return reject(error)
        })
      })
    },

  }
}
</script>

<style scoped>
.dashboard{
  /*top: 0;*/
  /*padding: 0;*/
  width: 100%;
  background-color: #324960;
  /*min-height: 100vh;*/
}
.image{
  height: 100px;
  width: 100px;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: black;
  text-align: center;
}
.box {
  margin: 10px auto;
  padding: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1);
  width: 49%;
  background-color: deepskyblue;
  word-wrap: break-word;
  transition: width 2s;
}

.box:hover {
  width: 55%;
  background: #0095ff;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
.nav{
  position: fixed;
  z-index: 2;
}
</style>
