<template>
  <div>
    <nab-bar/>
    <div class="register">
      <div class="Sign up"  style="padding-top: 60px">
        <h3 style="text-align: center"> Update account </h3>
        <div style="background-color: white; color: black; width: 600px; border-radius: 15px; padding: 25px">
          <validation-observer ref="observer" >
            <b-form v-on:submit.prevent="update_user" method="post">
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
                    v-model="user.name"
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
                    v-model="user.mobile"
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
                    v-model="user.email"
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
                    v-model="user.password"
                    type="password"
                    placeholder="Enter password"
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>

              <validation
                name="roll-number"
                rules="required"
              >
                <b-form-group
                  v-if="user.role==='student'"
                  id="input-group-5"
                  label="Roll number:"
                  label-for="input-5"
                  description=""
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-5"
                    v-model="user.role_number"
                    type="number"
                    placeholder="enter number"
                    :formatter="formatRole"
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                v-if="user.role!=='admin'"
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
                  <select v-model="user.course_id" >
                    <option v-for="course in courses" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="course.id " v-bind:value="course.id"> {{course.name}}</option>
                  </select>
                </b-form-group>
              </validation>
              <b-button style="width: 100%; background-color: deepskyblue; border: none; margin-top: 10px" type="submit" >Update</b-button>
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
  name: 'Update',
  data () {
    return {
      user:{},
      error:'',
      courses:[]
    }
  },
  mounted() {
    this.getCourse()
    this.get_teacher()

  },
  methods:{
    formatRole(e){
      return String(e).substring(0,5);
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
    get_teacher(){
      this.axios.get(`/teacher/` + this.$route.params.id).then(response =>{
        this.user=response.data
        console.log(response.data)
      }).catch(e=>{
        console.log(e)
      })
    },
    update_user(){
        axios.post(`/update-profile`, this.user)
          .then((resp)=> {
            resp.data
            this.$router.push({name: "UserInformation"})
          })
          .catch((e) =>{
              this.error=error.response.data.message
            }
          )
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
