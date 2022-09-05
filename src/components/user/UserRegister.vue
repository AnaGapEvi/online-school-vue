<template>
  <div>
    <nab-bar/>
  <div class="register">
    <div class="Sign up"  style="padding-top: 60px">
      <h3 style="text-align: center"> Create account </h3>
      <div style="background-color: white; color: black; width: 600px; border-radius: 15px; padding: 25px">
        <validation-observer ref="observer" >
          <b-form v-on:submit.prevent="create_user" method="post">
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
              name="user"
              rules="required"
            >
              <b-form-group label="Role">
                <div class="d-flex justify-content-evenly" style="width: 100%">
                  <p class="mt-1">
                    <b-form-radio v-model="form.role"   name="gender" value="teacher">Teacher</b-form-radio>
                  </p>
                  <p class="mt-1">
                    <b-form-radio v-model="form.role"  name="gender" value="student">Student</b-form-radio>
                  </p>
                </div>
              </b-form-group>
            </validation>
            <validation
              name="roll-number"
              rules="required"
            >
              <b-form-group
                v-if="form.role==='student'"
                id="input-group-5"
                label="Roll number:"
                label-for="input-5"
                description=""
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="input-5"
                  v-model="form.role_number"
                  type="number"
                  placeholder="enter number"
                  :formatter="formatRole"
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
                <select v-model="form.course_id" >
                  <option v-for="course in courses" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="course.id " v-bind:value="course.id"> {{course.name}}</option>
                </select>
              </b-form-group>
            </validation>
            <validation
              name="course"
              rules="required"
            >
              <b-form-group
                id="input-group-5"
                v-if="form.role=='teacher'"
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
            <b-button style="width: 100%; background-color: deepskyblue; border: none; margin-top: 10px" type="submit" >Sign up</b-button>
          </b-form>
        </validation-observer>
      </div>

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
        role_number: '',
        role:'',
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
    formatRole(e){
      return String(e).substring(0,5);
    },
    formatMobile(e){
      return String(e).substring(0,10);
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
    create_user(){
      console.log(this.form)
      if(this.form.password === this.form.repeatPassword){
        console.log(this.form)
          axios.post('/register', this.form)
            .then((resp)=> {
              resp.data
              this.form.name=''
              this.form.email=''
              this.form.password=''
              this.form.repeatPassword=''
              this.form.role_number= ''
              this.form.role=''
              this.form.subject_id=''
              this.form.course_id=''
              this.form.mobile=''
              this.$router.push({name: "Login"})
            })
            .catch((e) =>{
              this.error=error.response.data.message
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
