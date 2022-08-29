<template>
  <div class="dashboard">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%" />
    <div style="display: flex; justify-content: space-between; padding-top: 60px">
      <aside-navbar style="width: 18%;margin-top: 25px; height: 100%"/>
      <div style="width: 80%; margin-top: 25px; background-color: #324960">
        <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
          <h4>Dashboard</h4>
          <div>
            <router-link to="/teacher-dashboard" style="text-decoration: none; color: gray">Dashboard</router-link> /
            <router-link to="/assignment-information" style="text-decoration: none; color: black">Assignment Information</router-link>
          </div>
        </div>
        <div style="background-color: white; padding: 15px; margin-bottom: 15px; ">
          <div v-for="course in courses">
            <h3 v-if="course.users.length>0" style="margin: 25px">{{course.name}}</h3>
            <table v-if="course.users.length>0" style="width: 100%; border: 1px solid black;">
              <tr style="width: 60%; border: 1px solid black">
                <th>No</th>
                <th>name</th>
                <th>Role</th>
                <th>Role Number</th>
                <th>Mobile</th>
              </tr>
              <tr v-for="(user, index) in course.users" :key="index" style="width: 60%; border: 1px solid black">
                <td style="padding: 5px" v-if="user.role==='student'">{{ incrementIndex(index) }}</td>
                <td style="padding: 5px" v-if="user.role==='student'">{{ user.name}}</td>
                <td style="padding: 5px" v-if="user.role==='student'">{{ user.role}}</td>
                <td style="padding: 5px" v-if="user.role==='student'">{{ user.role_number}}</td>
                <td style="padding: 5px" v-if="user.role==='student'">+374-{{ user.mobile}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'TeacherDashboard',
  components: {},
  data () {
    return {
      error:'',
      courses:[],

    }
  },
  mounted() {
    this.getUsers()
  },
  methods:{
    incrementIndex(key) {
      return key + 1;
    },
    getUsers(){
      return new Promise((resolve, reject) =>{
        this.axios.get('/get-user-information').
        then((res)=>{
          this.courses=res.data
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
