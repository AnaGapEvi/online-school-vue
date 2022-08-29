<template>
  <div class="dashboard">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; padding-top: 60px ">
        <aside-navbar style="width: 25%; min-height: 100vh; background-color: white; margin-right: 15px"/>
        <div style="background-color: white; width: 73%; flex-wrap: wrap; display: flex; padding: 15px">
          <div v-for="course in courses" style="margin: 5px; width: 25%; ">
            <div style="background-color: #e0d5d5; border-radius: 10px; padding: 20px" >
              <p> {{course.name}} </p>
              <div v-for="user in course.users">
                <p> {{user.name}} </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  data () {
    return {
      courses:[],
      // course:[]
    }
  },
  mounted() {
    // this.getCourses()
    this.getUserCourses(2)
  },

  methods:{
    // getCourses() {
    //   return new Promise((resolve, reject) => {
    //     this.axios.get('courses').then((res) => {
    //       this.courses = res.data
    //       return resolve(true);
    //     }).catch((error) => {
    //       return reject(error)
    //     })
    //   })
    // },
    getUserCourses(id) {
      return new Promise((resolve, reject) => {
        this.axios.get(`/get-user-course/${id}`).then((res) => {
          this.courses = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
  }
}
</script>

<style scoped>
.dashboard{
  /*padding: 15px;*/
  background-color: #e0d5d5;
  min-height: 100vh;
}
</style>
