<template>
    <div class="dashboard">
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%" />
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
          <aside-navbar style="width: 18%;margin-top: 25px;"/>
        <div style="width: 80%;  margin-top: 25px; background-color: #324960 ">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>Dashboard</h4>
            <div>
              <router-link to="/teacher-dashboard" style="text-decoration: none; color: gray">Dashboard</router-link> /
              <router-link to="/assignment-information" style="text-decoration: none; color: black">Assignment Information</router-link>
            </div>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: space-between; background-color: #324960; margin-bottom: 15px;padding: 15px 0 ">
            <div style="background-color: white; width: 30%; padding: 15px; text-align: right">
              <p>Total Students</p>
              <p>{{count.students}}</p>
              <router-link to="/student-teacher-course" style="text-decoration: none">View Detail</router-link>
            </div>
            <div style="background-color: white; width: 30%; padding: 15px; text-align: right">
              <p>Total Assignment</p>
              <p>{{count.assignment}}</p>

              <router-link to="/total-assignment" style="text-decoration: none">View Detail</router-link>

            </div>
            <div style="background-color: white; width: 30%; padding: 15px; text-align: right">
              <p>Total Announcement</p>
              <p>{{count.announcement}}</p>
              <router-link to="/all-announcement" style="text-decoration: none">View Detail</router-link>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px; background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
    </div>

</template>

<script>
export default {
  name: 'TeacherDashboard',
  components: {},

  data () {
    return {
      error:'',
      count:{
        announcement:0,
        assignment:0,
        students:0
      }

    }
  },
  mounted() {
    this.getAnnouncement()
    this.getAssignment()
    this.getStudents()
  },
  methods:{
    getAnnouncement(){
      return new Promise((resolve, reject) =>{
        this.axios.get('announcement-count').
        then((res)=>{
          this.count.announcement=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })
    },
    getAssignment(){
      return new Promise((resolve, reject) =>{
        this.axios.get('assignment-count').
        then((res)=>{
          this.count.assignment=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })
    },
    getStudents(){
      return new Promise((resolve, reject) =>{
        this.axios.get('students-count').
        then((res)=>{
          this.count.students=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })
    },
  }
}
</script>

<style scoped>
.dashboard{
  background-color: #324960;
  min-height: 100vh;
}
</style>
