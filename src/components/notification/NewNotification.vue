<template>
  <div class="notification">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
          <aside-navbar/>
        </div>
        <div style="width: 78%; margin-top: 25px; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>Create notification</h4>
            <div style="display: flex">
              <router-link to="/teacher/all-notifications"style="color: black; text-decoration: none">All Notifications </router-link> /
              <router-link to="/teacher/new-notification" style="color: gray; text-decoration: none"> New Notifications</router-link>
            </div>


          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <validation-observer ref="observer">
              <b-form @submit.prevent="new_notification">
                <validation
                  name="title"
                  rules="required"
                >
                  <b-form-group
                    label-class="form-label"
                    label="Title:"
                    label-for="notification"
                    slot-scope="{ errors }"
                    :invalid-feedback="errors[0]"
                  >
                    <b-form-input
                      id="notification"
                      v-model="form.title"
                      placeholder="........"
                      :state="errors[0] ? false : null"
                      trim
                    />
                  </b-form-group>
                </validation>
                <validation
                  name="body"
                  rules="required|min:15"
                >
                  <b-form-group
                    label-class="form-label"
                    label="Body:"
                    label-for="body"
                    slot-scope="{ errors }"
                    :invalid-feedback="errors[0]"
                  >
                    <b-form-textarea
                      id="body"
                      placeholder="enter text"
                      v-model="form.body"
                      :state="errors[0] ? false : null"
                      trim
                    />
                  </b-form-group>
                </validation>
                <div class="mt-3">
                  <b-button style="width: 100%; border: none" type="submit" variant="success" >Add Notification</b-button>
                </div>
                <span style="color: #e59898" v-if="error!==''">{{error}}</span>
              </b-form>
            </validation-observer>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideNavbarAdmin from "../custom/AsideNavbarAdmin";
export default {
  name: 'NewNotification',
  components: {AsideNavbarAdmin},
  data () {
    return {
      form:{
        title:'',
        body:''
      },
      error:'',
      course:''

    }
  },
  mounted() {
    this.course_teacher()
  },
  methods:{
    course_teacher(){
      this.axios('/course-teacher').then(resp =>{
        this.course = resp.data.courses.id
        return resp
      }).catch(e =>{
        return e
      })
    },
    new_notification(){
      this.axios.post('/new-notification', this.form).then(response =>{
        this.form.title=''
        this.form.body=''
        this.$router.push({name: "AllNotifications"});

      }).catch(e=>{
        console.log(e)
      })
    }
  }


}
</script>
<style scoped>
.notification{
  min-height: 100vh;
  background-color: #324960;
}
</style>
