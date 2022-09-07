<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 90px ">
      <aside-navbar style="width: 20%; background-color: white; margin-right: 15px"/>
      <div  style="width: 78%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1>All Course</h1>
          <router-link to="/new-course">Add Course</router-link>
        </div>
        <table style="width: 100%; border: 1px solid black;">
          <tr style="width: 60%; border: 1px solid black">
            <th>No</th>
            <th>Course</th>
            <th style="text-align: center; padding: 5px">Edit</th>
            <th style="text-align: center; padding: 5px">Delete</th>
          </tr>
          <tr v-for="(course, index) in courses" :key="index" style="width: 60%; border: 1px solid black">
            <td style="padding: 5px">{{ incrementIndex(index) }}</td>
            <td style="padding: 5px">{{ course.name}}</td>
            <td style="text-align: center; padding: 5px"><b-button variant="warning"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-course/'+course.id}">Edit</router-link>  </b-button></td>
            <td style="text-align: center; padding: 5px"><b-button @click="deleteCourse(course.id)" variant="danger">  Delete </b-button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllCourse",
  data () {
    return {
      courses:[],
    }
  },
  mounted() {
    this.getCourses()
  },

  methods: {
    incrementIndex(key) {
      return key + 1;
    },
    getCourses() {
      return new Promise((resolve, reject) => {
        this.axios.get('courses').then((res) => {
          this.courses = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteCourse(id){
      this.axios.delete(`/delete-course/${id}`).then(response =>{
        let i = this.courses.map(data => data.id).indexOf(id)
        this.courses.splice(i, 1)
        return response
      }).catch(e =>{
        return e
      })

    },

  }
}
</script>

<style scoped>
.subjects{
  /*padding: 15px;*/
  min-height: 100vh;
  background-color: #324960;
}
th{
  background-color: #74b9ea;
}
tr{
  text-align: center;
}
</style>
