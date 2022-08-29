<template>
  <div class="subject">
      <dashboard-nav/>
      <div style="display: flex; justify-content: space-between; padding-top: 80px ">
        <aside-navbar style="width: 20%; background-color: white"/>
        <div  style="width: 78%; background-color: white; padding: 15px ">
          <div style="display: flex; justify-content: space-between">
            <h3 style="color: black; text-align: center; padding-top: 15px">New Subject</h3>
            <router-link to="/all-subjects">All Subjects</router-link>
          </div>
          <validation-observer ref="observer">
            <b-form @submit.prevent="new_subject">
              <validation
                name="title"
                rules="required"
              >
                <b-form-group
                  label-class="form-label"
                  label="Subject name:"
                  label-for="subject"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="news"
                    v-model="form.name"
                    placeholder="........"
                    :state="errors[0] ? false : null"
                    trim
                  />

                </b-form-group>
              </validation>

              <b-button style="margin-top: 15px; width: 60%; border: none" type="submit" variant="success" >Add subject</b-button>

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
    new_subject(){
      this.axios.post('/new-subject', this.form).then(response =>{
        this.$router.push({name: 'AllSubjects'})
      }).catch(e=>{
        console.log(e)
      })
    },

  }


}
</script>

<style scoped>
.subject{
  /*padding: 15px;*/
  background-color: #324960;
}
</style>
