<template>
  <div class="participant">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%; background-color: gray"/>
    <div style="display: flex; padding: 90px; justify-content: space-evenly">
        <div style="  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1); margin: 0 auto; width: 30%; padding: 15px;background-color: deepskyblue" >
          <div style="padding-top: 30px" v-for="i in regCourses" :key="i.id" class="sts">
            <b-card
              title="Course "
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <div v-for="course in i.courses" :key="course.id">
                <p style="color: green">{{course.name}} </p>
              </div>
            </b-card>
          </div>
        </div>
        <div style="margin: 0 auto; padding: 15px;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1); width: 49%; background-color: deepskyblue">
          <div style="display: flex; justify-content: center;align-items: center;  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 3);padding-top: 30px" v-for="i in unregCourses" :key="i.id">
            <b-card
              title="Course "
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <p>
                {{i.name}}
              </p>
              <b-button href="#" variant="primary" @click="registerCourse(i.id)">Register</b-button>
            </b-card>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "CourseParticipants",
  data () {
    return {
      regCourses:[],
      unregCourses:[],
    }
  },
  mounted() {
    this.getUnregisteredCourse()
    this.getRegisteredCourse()
    this.log()
  },
  methods: {
    log(){
        this.axios.post('log', {pageName:'User Course'}).then(resp => {
          return resp
        }).catch(e =>{
          return e
        })

    },
    getRegisteredCourse() {
      return new Promise((resolve, reject) => {
        this.axios.get('registered-course').then((res) => {
          this.regCourses = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getUnregisteredCourse() {
      return new Promise((resolve, reject) => {
        this.axios.get('unregistered-course').then((res) => {
          this.unregCourses = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    registerCourse(id){
      this.axios.post('/register-course', {courseId:id}).then(response =>{
        let i = this.unregCourses.map(data => data.id).indexOf(id)
        this.unregCourses.splice(i, 1)
        return response
      }).catch(e => {
        return e
      })

    }
  }
}
</script>

<style scoped>
.participant{
  min-height: 100vh;
  background-color: #324960;
}
</style>
