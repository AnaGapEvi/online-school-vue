<template>
  <div class="aside" v-if="role!=='student'">
      <b-navbar-nav style="padding-left: 10px; color: black; background-color: white; display: flex; flex-direction: column;">
        <b-navbar-brand href="#" class="left" style="color: deepskyblue;padding: 8px"><h3>APPS</h3></b-navbar-brand>
        <b-navbar-nav style="">
          <b-nav-item style="color:black; display:flex; flex-direction: column; justify-content: center" >
            <b-icon style="margin-right: 15px" icon="house" scale="1" variant="Secondary"></b-icon>
            <router-link v-if="role==='admin'" to="/admin-dashboard">Dashboard</router-link>
            <router-link v-if="role==='teacher'" to="/teacher-dashboard">Dashboard</router-link>
          </b-nav-item>
        </b-navbar-nav>
<!--        Announcements-->
        <b-navbar-nav toggleable  class="ml-auto ">
          <b-nav-item v-if="role==='admin'" style="display: flex; flex-direction: column">
            <b-nav-item-dropdown text="Announcement">
              <b-dropdown-item><router-link to="/all-announcement" style="text-decoration: none;color: black">Announcements</router-link></b-dropdown-item>
              <b-dropdown-item ><router-link to="/new-announcement" style="text-decoration: none;color: black">Add Announcements </router-link> </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
<!--          news-->
          <b-nav-item v-if="role==='admin'">
            <b-nav-item-dropdown text="News">
              <b-dropdown-item><router-link to="/all-news"  style="text-decoration: none;color: black">News </router-link> </b-dropdown-item>
              <b-dropdown-item><router-link to="/create-news"  style="text-decoration: none;color: black">Add news</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
<!--          course-->
          <b-nav-item v-if="role==='admin'">
            <b-nav-item-dropdown  text="Course">
              <b-dropdown-item><router-link to="/all-courses"  style="text-decoration: none;color: black">Courses </router-link> </b-dropdown-item>
              <b-dropdown-item><router-link to="/new-course"  style="text-decoration: none;color: black">Add Course</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
<!--          subject-->
          <b-nav-item v-if="role==='admin'">
            <b-nav-item-dropdown text="Subject">
              <b-dropdown-item><router-link to="/all-subjects"  style="text-decoration: none;color: black">Subjects </router-link> </b-dropdown-item>
              <b-dropdown-item v-if="role==='admin'"><router-link to="/new-subject"  style="text-decoration: none;color: black">Add subject</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
          <b-nav-item v-else>
            <b-icon style="margin-right: 15px" icon="newspaper" scale="1" variant="Secondary"></b-icon>
            <router-link to="/all-announcement"  style="text-decoration: none;color: black">Announcements</router-link> /
            <router-link to="/all-news"  style="text-decoration: none;color: black">News </router-link>
          </b-nav-item>
          <b-nav-item >
            <b-icon style="margin-right: 15px" icon="newspaper" scale="1" variant="Secondary"></b-icon>
            <router-link to="/student-teacher-course"  style="text-decoration: none;color: black">Course Users </router-link>
          </b-nav-item>
          <b-nav-item v-if="role==='admin'">
            <b-icon style="margin-right: 15px" icon="newspaper" scale="1" variant="Secondary"></b-icon>
            <router-link to="/admin/statistics-student-page"  style="text-decoration: none;color: black">Statistics page student</router-link>
          </b-nav-item>
          <b-nav-item v-if="role==='admin'">
            <b-icon style="margin-right: 15px" icon="newspaper" scale="1" variant="Secondary"></b-icon>
            <router-link  to="/all-courses"  style="text-decoration: none;color: black">Course </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav toggleable  class="ml-auto ">
<!--          <b-nav-item>-->
            <b-nav-item-dropdown text="Assignment" >
                <b-dropdown-item href="#" v-if="role==='teacher'"><router-link to="/assignment-information">Add Assignment</router-link></b-dropdown-item>
              <b-dropdown-item><router-link v-if="role==='admin'" to="/all-assignments">All Assignments</router-link></b-dropdown-item>
              <b-dropdown-item><router-link v-if="role==='teacher'" to="/unchecked-assignments">All Assignments</router-link></b-dropdown-item>
<!--              <b-dropdown-item> <router-link v-if="role==='teacher'"to="/checked-assignments">Checked Assignments</router-link></b-dropdown-item>-->
              <b-dropdown-item> <router-link v-if="role==='admin'" to="/verified-assignment">Checked Assignments</router-link></b-dropdown-item>
<!--              <b-dropdown-item><router-link  v-if="role==='teacher'" to="/unchecked-assignments">Unchecked Assignments</router-link></b-dropdown-item>-->
              <b-dropdown-item><router-link v-if="role==='admin'" to="/unverified-assignment">Unchecked Assignments</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
<!--          </b-nav-item>-->
        </b-navbar-nav>
        <b-navbar-nav  v-if="role==='admin'">
          <b-nav-item>
            <b-icon style="margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>
            <router-link to="/all-teachers" style="text-decoration: none; color: black">All Teachers</router-link>
          </b-nav-item>
        </b-navbar-nav>
          <b-navbar-nav  v-if="role==='admin'">
            <b-nav-item>
              <b-icon style="margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>
              <router-link to="/all-users" style="text-decoration: none; color: black">All Users</router-link>
            </b-nav-item>
          </b-navbar-nav>

        <b-navbar-nav  >
          <b-nav-item>
            <b-icon icon="person" scale="1" style="color: black; margin-right: 8px"></b-icon>
            <router-link to="/reg-users" style="text-decoration: none;color: black">Reg Users </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav   toggleable  class="ml-auto " v-if="role==='teacher'">
          <b-nav-item>
            <b-nav-item-dropdown text="Notification" right>
              <b-dropdown-item href="#" >
                <router-link to="/teacher/new-notification" style="text-decoration: none;color: black">New Notification </router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/teacher/all-notifications" style="text-decoration: none;color: black">All Notifications </router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav style="padding:8px">
          <b-nav-item>
            <b-icon style="margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>
            <router-link to="/reports-assignments" style="text-decoration: none; color: black">Subject Wise Report</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email:'',
      role:''
    }
  },
  mounted() {
    this.getMy()
  },
  methods: {
    getMy() {
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
  }
}
</script>

<style scoped>
.aside{
  background-color: white;
  min-height: 100vh;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1);
  /*position: fixed;*/
}
</style>
