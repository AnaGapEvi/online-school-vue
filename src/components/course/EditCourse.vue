<template>
  <div class="course">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 90px ">
      <aside-navbar style="width: 30%; background-color: white; margin-right: 15px"/>
      <div  style="width: 68%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h3 style="color: black; text-align: center; padding-top: 15px">New Course</h3>
          <router-link to="/all-courses">All Course</router-link>
        </div>
    <div style="width: 50%; height: 80%; background-color: white; border-radius: 15px">

      <b-col
        cols="5"
        md="8"
        lg="12"
        xl="10"
        class="mx-auto"
      >
        <validation-observer ref="observer">
          <b-form @submit.prevent="edit_course">
            <validation
              name="title"
              rules="required"
            >
              <b-form-group
                label-class="form-label"
                label="Course Name:"
                label-for="course"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="course"
                  v-model="course.name"
                  placeholder="........"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <div class="mt-3">
              <b-button style="width: 100%; border: none" type="submit" variant="success" @click="edit_course()">Update</b-button>
            </div>
            <span style="color: #e59898" v-if="error!==''">{{error}}</span>
          </b-form>
        </validation-observer>
        <div class="d-flex justify-content-between" style="width: 100%">
          <p class="mt-5">
            <router-link to="/all-courses" style="color: green; text-decoration: none "><<  Back</router-link>
          </p>
        </div>
      </b-col>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCourse',
  data () {
    return {
      form:{
        title:'',
        body:''
      },
      id:this.$route.params.id,
      course:{},
      error:''
    }
  },
  mounted() {
    this.get_course()
  },
  methods:{
    get_course(){
      this.axios.get(`/course/` + this.id).then(response =>{
        this.course=response.data
      }).catch(e=>{
        console.log(e)
      })
    },
    edit_course(){
      this.axios.put(`/edit-course/`+this.$route.params.id, this.course).then(response =>{
        if(response){
          this.$router.push({name: "AllCourses"});
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.course{
  background-color: #e0d5d5;
}
</style>
