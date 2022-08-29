<template>
  <div>
    <nab-bar/>
    <div class="login" >
      <div style="width: 50%; height: 80%; background-color: white; border-radius: 15px">
        <h3 style="color: deepskyblue; text-align: center; padding-top: 15px">Login</h3>
        <b-col
          cols="5"
          md="8"
          lg="12"
          xl="10"
          class="mx-auto"
        >
          <validation-observer ref="observer">
            <b-form @submit.prevent="login_user">
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
                    :state="errors[0] ? false : null"
                    trim
                  />
                </b-form-group>
              </validation>
              <div class="mt-3">
                <b-button style="width: 100%; background-color: deepskyblue; border: none" type="submit" >Login</b-button>
              </div>
              <span style="color: #e59898" v-if="error!==''">{{error}}</span>
            </b-form>
          </validation-observer>
          <div class="d-flex justify-content-between" style="width: 100%">
            <p class="mt-5">
              <router-link to="/forgot-password" style="color: deepskyblue; text-decoration: none ">Forgot your password?</router-link>
            </p>
            <p class="mt-5">
              <router-link to="/reset-password" style="color: deepskyblue; text-decoration: none ">Reset password?</router-link>

            </p>
            <p class="mt-5">
              <router-link to="/register" style="color: deepskyblue; text-decoration: none ">Don't have an account?</router-link>
            </p>
          </div>
        </b-col>
        <!--        </b-row>-->
        <!--      </b-container>-->
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form:{
        email:'',
        password:''
      },
      token:'',
      error:''
    }
  },
  methods:{
    login_user() {
      return new Promise((resolve, reject) => {
        this.axios.post('/login', this.form)
          .then(result => {
            localStorage.setItem('access_token', result.data.token);
            // resolve(true)
            this.$router.push({name: "Home"})
            window.location.reload()
          }).catch(error => {
          this.error=error.response.data.message
          // this.error='bolor dashter@ partadir en'
          this.form.password = ''
        })
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  background-color: deepskyblue;
  color: deepskyblue;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
