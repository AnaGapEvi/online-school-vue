<template>
  <div class="announcement">
    <div style="width: 50%; height: 80%; background-color: white; border-radius: 15px">
      <h3 style="color: black; text-align: center; padding-top: 15px">Update Announcement</h3>
      <b-col
        cols="5"
        md="8"
        lg="12"
        xl="10"
        class="mx-auto"
      >
        <validation-observer ref="observer">
          <b-form @submit.prevent="edit_announcement">
            <validation
              name="title"
              rules="required"
            >
              <b-form-group
                label-class="form-label"
                label="Announcement Title:"
                label-for="announcement"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-input
                  id="announcement"
                  v-model="announcement.title"
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
                  v-model="announcement.body"
                  :state="errors[0] ? false : null"
                  trim
                />
              </b-form-group>
            </validation>
            <div class="mt-3">
              <b-button style="width: 100%; border: none" type="submit" variant="success" >Update</b-button>
            </div>
            <span style="color: #e59898" v-if="error!==''">{{error}}</span>
          </b-form>
        </validation-observer>
        <div class="d-flex justify-content-between" style="width: 100%">
          <p class="mt-5">
            <router-link to="/all-announcement" style="color: green; text-decoration: none "><<  Back</router-link>
          </p>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewAnnouncement',
  data () {
    return {
      form:{
        title:'',
        body:''
      },
      id:this.$route.params.id,
      announcement:{},
      error:''
    }
  },
  mounted() {
    this.get_announcement()
  },
  methods:{
    get_announcement(){
      this.axios.get(`/announcement/` + this.id).then(response =>{
        this.announcement=response.data
      }).catch(e=>{
        console.log(e)
      })
    },
    edit_announcement(){
      this.axios.put(`/edit-announcement/`+this.$route.params.id, this.announcement).then(response =>{
        if(response){

          this.$router.push({name: "AllAnnouncement"});
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.announcement{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: black;
}
</style>
