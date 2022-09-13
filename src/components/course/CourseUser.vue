<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; padding-top: 90px ">
      <aside-navbar style="width: 30%; background-color: white; margin-right: 15px"/>
      <div  style="width: 100%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1>Users registered for the course</h1>
<!--          <router-link to="/new-course">Add Course</router-link>-->
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
    }
  },
  mounted() {
    this.getCourses()
  },
  methods: {
    getCourses() {
      // return new Promise((resolve, reject) => {
        this.axios.get('/get-user-task').then(res => {
          this.courses = res.data
        }).catch(error => {
          return error
      })
    },

  }
}
</script>

<style scoped>
.subjects{
  /*padding: 15px;*/
  min-height: 100vh;
  background-color: #e0d5d5;
}
</style>
