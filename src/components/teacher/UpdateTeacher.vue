<template>
  <div>
    <nab-bar/>
    <div class="register">
      <div class="Sign up"  style="padding-top: 60px">
        <h3 style="text-align: center"> Edit teacher </h3>
        <div style="background-color: white; color: black; width: 600px; border-radius: 15px; padding: 25px">
          <validation-observer ref="observer" >
            <b-form v-on:submit.prevent="edit_teacher" method="post">
              <validation
                name="name"
                rules="required"
              >
                <b-form-group
                  id="input-group-1"
                  label="Name:"
                  label-for="input-1"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-1"
                    v-model="teacher.name"
                    type="text"
                    placeholder="name..."
                    :state="errors[0] ? false : null"
                    trim

                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                name="mobile"
                rules="required"
              >
                <b-form-group
                  id="input-group-2"
                  label="Mobile:"
                  label-for="input-1"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-3"
                    v-model="teacher.mobile"
                    type="number"
                    :formatter="formatMobile"
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                name="email"
                rules="required|email"
              >
                <b-form-group
                  id="input-group-3"
                  label="Email address:"
                  label-for="input-1"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-3"
                    v-model="teacher.email"
                    type="email"
                    placeholder="Enter email"
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                name="password"
                rules="required|min:6"
              >
                <b-form-group
                  id="input-group-4"
                  label="Password:"
                  label-for="input-4"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-1"
                    v-model="teacher.password"
                    type="password"
                    placeholder="Enter password"
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                name="course"
                rules="required"
              >
                <b-form-group
                  id="input-group-5"
                  label="Course:"
                  label-for="input-5"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <select v-model="course_id" >
                    <option v-for="course in courses" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="course.id " v-bind:value="course.id"> {{course.name}}</option>
                  </select>
                </b-form-group>
              </validation>
              <b-button style="width: 100%; background-color: deepskyblue; border: none; margin-top: 10px" type="submit" @click="edit_teacher()">Update</b-button>
            </b-form>
          </validation-observer>
        </div>
        <router-link to="/all-teachers">All Teacher</router-link>

        <span v-if="error!==''">{{error}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignUp',
  components: {},

  data () {
    return {
      teacher:{},
      error:'',
      course_id:'',
      subjects:[],
      courses:[],
      user:[]
    }
  },
  mounted() {
    this.getSubject()
    this.get_teacher()
    this.getMy()
    this.getCourse()
  },
  methods:{
    getMy() {
      this.axios.get('/me').then(res => {
        this.user = res.data.user
      }).catch(error => {
        return error
      })
    },
    formatMobile(e){
      return String(e).substring(0,10);
    },
    getCourse(){
      return new Promise((resolve, reject) =>{
        this.axios.get('courses').
        then((res)=>{
          this.courses=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })

    },
    getSubject(){
      return new Promise((resolve, reject) =>{
        this.axios.get('/subjects').
        then((res)=>{
          this.subjects=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })
    },
    get_teacher(){
      this.axios.get(`/teacher/` + this.$route.params.id).then(response =>{
        this.teacher=response.data
      }).catch(e=>{
        console.log(e)
      })
    },
    edit_teacher(){
      // this.axios.put(`/edit-teacher/`+this.$route.params.id,  {...this.teacher, courseId : this.course_id}).then(response =>{
      this.axios.put(`/edit-teacher/`+this.$route.params.id,  this.teacher).then(response =>{
        if(response){
          if(this.user.role==='teacher'){
            this.$router.push({name: "UserInformation"});
          } else if(this.user.role==='admin'){
            this.$router.push({name: "AdminDashboard"});
          } else {
            this.$router.push({name: "/"});
          }
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.register{
  background-color: deepskyblue;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
