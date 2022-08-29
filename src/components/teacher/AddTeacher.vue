<template>
  <div>
    <nab-bar/>
    <div class="register">
      <div class="Sign up"  style="padding-top: 60px">
        <h3 style="text-align: center"> Create account </h3>
        <div style="background-color: white; color: black; width: 600px; border-radius: 15px; padding: 25px">
          <validation-observer ref="observer" >
            <b-form v-on:submit.prevent="create_teacher" method="post">
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
                    v-model="form.name"
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
                    v-model="form.mobile"
                    type="number"
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
                    v-model="form.email"
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
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
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
                  label="Repeat Password:"
                  label-for="input-4"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.repeatPassword"
                    type="password"
                    placeholder="Repeat password"
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
                  label="Subject:"
                  label-for="input-5"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <select v-model="form.subject_id" >
                    <option v-for="subject in subjects" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="subject.id " v-bind:value="subject.id"> {{subject.name}}</option>
                  </select>
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
                  <select v-model="form.course_id" >
                    <option v-for="course in courses" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="course.id " v-bind:value="course.id"> {{course.name}}</option>
                  </select>
                </b-form-group>
              </validation>
              <b-button style="width: 100%; background-color: deepskyblue; border: none; margin-top: 10px" type="submit" >Sign up</b-button>
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
      form:{
        name:'',
        email:'',
        password:'',
        repeatPassword:'',
        role:'teacher',
        subject_id:'',
        course_id:'',
        mobile:'',
      },
      error:'',
      subjects:[],
      courses:[]
    }
  },
  mounted() {
    this.getSubject()
    this.getCourse()
  },
  methods:{
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
    create_teacher(){
      if(this.form.password === this.form.repeatPassword){
        axios.post('/register', this.form)
          .then((resp)=> {
            resp.data
               this.$router.push({name: "AllTeachers"})
          })
          .catch((e) =>{
              this.error=e.response.data.message
            }
          )
      } else {
        this.form.password = ""
        this.form.repeatPassword = ""
        this.error='password does not match'
      }
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
