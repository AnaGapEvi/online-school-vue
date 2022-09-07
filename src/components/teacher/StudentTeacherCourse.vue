<template>
  <div class="dashboard">
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%" />
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <aside-navbar style="width: 18%;margin-top: 25px; height: 100%"/>
        <div style="width: 80%; margin-top: 25px; background-color: #324960">
          <div
            style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>Students in Course</h4>
          </div>
          <div style="margin: 15px 0; width: 100%; background-color: white; padding: 15px">
            <p>All students in course</p>
            <div style="background-color: white; border-radius: 5px" v-for="course in courses">
              <h4>{{course.name}}</h4>
              <table>
                <tr>
                  <th>No</th>
                  <th>Student name</th>
                  <th>Student email</th>
                  <th>Student mobile</th>
                  <th>Role</th>
                  <th>Student role nubmer</th>
                </tr>
                <tr v-for="(user, index) in course.users" :key="index">
                  <td>{{incrementIndex(index)}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.mobile}}</td>
                  <td>{{user.role}}</td>
                  <td>{{user.role_number}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">
            This dashboard was SEAO
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "StudentTeacherCourse",
  components: {},


  data() {
    return {
      courses: [],
      count:1
    }
  },
  mounted() {
    this.getStudent()
  },
  methods: {
    incrementIndex(key) {
      return key + 1;
    },
    getStudent() {
        this.axios.get('/students-course').then((res) => {
          this.courses = res.data
        }).catch(error => {
          return error
      })
    },
  }
}
</script>

<style scoped>
.dashboard {
  background-color: #324960;
  min-height: 100vh;
}
table{
  width: 90%;
}
table, th, td {
  border: 1px solid;
  padding: 5px;
}
tr:hover{
  background:#BDC3C7;
  color:#FFFFFF;
}
</style>
