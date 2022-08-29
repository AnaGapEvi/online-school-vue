<template>
  <div>
    <nab-bar/>
  <div class="login" >
    <div style="width: 50%; height: 80%; background-color: white; border-radius: 15px">
      <!--      <b-container class="px-0 mt-5">-->
      <h3 style="color: deepskyblue; text-align: center; padding-top: 15px">Forgot Password</h3>
      <b-col
        cols="5"
        md="8"
        lg="12"
        xl="10"
        class="mx-auto"
      >
        <validation-observer ref="observer">
          <b-form @submit.prevent="forgot_password">
            <validation
              name="email"
              rules="required|email"
            >
              <b-form-group
                label-class="form-label"
                label="Email Address"
                label-for="email"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="email"
                  v-model="form.email"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <validation
              name="password"
              rules="required|min:8"
            >
              <b-form-group
                label-class="form-label"
                label="Password"
                label-for="password"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="***********"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <validation
              name="password"
              rules="required|min:8"
            >
              <b-form-group
                label-class="form-label"
                label="Repeat Password"
                label-for="password"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="password"
                  v-model="form.repeat_password"
                  type="password"
                  placeholder="***********"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <div class="mt-3">
              <b-button style="width: 100%; background-color: deepskyblue; border: none" type="submit" >Forgot Password</b-button>



            </div>
            <span style="color: #e59898" v-if="error!==''">{{error}}</span>
          </b-form>
        </validation-observer>
        <div class="d-flex justify-content-between" style="width: 100%">
          <p class="mt-5">
            <router-link to="/login" style="color: deepskyblue; text-decoration: none ">Go to login page</router-link>
          </p>
          <p class="mt-5">
            <router-link to="/reset-password" style="color: deepskyblue; text-decoration: none ">Reset password?</router-link>
          </p>
        </div>
      </b-col>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgot',
  data () {
    return {
      form:{
        email:'',
        password:'',
        repeat_password:''
      },
      token:'',
      error:''
    }
  },
  methods: {
    forgot_password() {
        if(this.form.password===this.form.repeat_password){
          this.axios.put('/forgot', this.form)
            .then((resp) => {
              if(resp){
                this.$router.push({name: "Login"});
              } else {
                console.log('you not have a account')
              }
            })
            .catch((e) => {
              console.log(e)
            })
        } else{
          this.error='password does not match'
        }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  background-color: deepskyblue;
  color: black;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
