<template>
  <div class="news">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
          <aside-navbar/>
        </div>
        <div style="width: 78%; margin-top: 25px; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>New announcement</h4>
            <router-link to="/all-announcement">All announcement</router-link>

          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <validation-observer ref="observer">
              <b-form @submit.prevent="new_announcement">
                <validation
                  name="title"
                  rules="required"
                >
                  <b-form-group
                    label-class="form-label"
                    label="News Title:"
                    label-for="news"
                    slot-scope="{ errors }"
                    :invalid-feedback="errors[0]"
                  >
                    <b-form-input
                      id="news"
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
                  <b-button style="width: 100%; border: none" type="submit" variant="success" >Add news</b-button>
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
export default {
  name: 'NewNews',
  data () {
    return {
      form:{
        title:'',
        body:''
      },
      error:''
    }
  },
  methods:{
    new_announcement(){
      this.axios.post('/new-announcement', this.form).then(response =>{
        this.$router.push({name: 'AllAnnouncement'})

        console.log(response)
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news{
  /*justify-content: center;*/
  /*align-items: center;*/
  min-height: 100vh;
  background-color: #324960;
}
</style>
