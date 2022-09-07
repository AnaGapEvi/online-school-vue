<template>
  <div class="course">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 90px ">
      <aside-navbar style="width: 20%; background-color: white; margin-right: 15px"/>
      <div  style="width: 78%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h3 style="color: black; text-align: center; padding-top: 15px">Add Course</h3>
          <router-link to="/all-courses" style="color: black">All Course</router-link>
        </div>
        <validation-observer ref="observer">
          <b-form @submit.prevent="new_course">
            <validation
              name="title"
              rules="required"
            >
              <b-form-group
                label-class="form-label"
                label-for="subject"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="news"
                  v-model="form.name"
                  placeholder="Course name"
                  :state="errors[0] ? false : null"
                  trim
                />

              </b-form-group>
            </validation>

            <button class="btn" style="margin-top: 25px; border: none" type="submit" >Add course</button>

          </b-form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newSubject",
  data(){
    return{
      form:{
        name:''
      },
      error:'',

    }
  },
  methods:{
    new_course(){
      this.axios.post('/new-course', this.form).then(response =>{
        this.$router.push({name: 'AllCourses'})
      }).catch(e=>{
        return e
      })
    },

  }


}
</script>

<style scoped>
.course{
  /*padding: 15px;*/
  background-color: #324960;
}
.btn{
  width: 100%;
  float: right;
  font-size: 20px;
  text-align: center;
  /*line-height: 100px;*/
  color: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  background: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
  background-size: 600%;
}
#news{
  border-radius: 50px;
}
</style>
