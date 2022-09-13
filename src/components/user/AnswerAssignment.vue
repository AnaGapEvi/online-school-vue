<template>
  <div class="dashboard">
    <dashboard-nav />
    <div style="width: 90%;  margin: 0 auto; padding-top: 80px">
      <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; color: black;">
        <p>Answer the task {{this.$route.params.id}}</p>

        <div style="width: 30%; border:1px solid black; background-color: white; border-radius: 15px">
          <validation-observer ref="observer" style="width: 100%;display: flex; flex-wrap: wrap; justify-content: space-between;">
            <b-form  enctype="multipart/form-data" style="display: flex; flex-wrap: wrap; justify-content: space-between">
              <div style="width: 100%;display: flex; padding: 15px">
                <validation
                  name="Answer File"
                  rules="required"
                >
                  <b-form-group
                    label-class="form-label"
                    label="Upload File"
                    label-for="file"
                    slot-scope="{ errors }"
                    :invalid-feedback="errors[0]"
                  >
                    <input type="file" name="file" @change="onImageChange" :state="errors[0] ? false : null">
                  </b-form-group>
                </validation>
              </div>
              <div style="width: 100%; padding: 15px">
                <div class="mt-3">
                  <b-button href="#" variant="primary" @click="answer()">To answer</b-button>
                </div>
                <span style="color: #e59898" v-if="error!==''">{{error}}</span>
              </div>
            </b-form>
          </validation-observer>
        </div>

        <button class="btn" @click.prevent="back()"><< Back</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerAssignment",
  data(){
    return{
      Taskid: this.$route.params.id,
      error:'',
      form:{
        course_id:'',
        title:'',
        date:'',
        subject_id:'',
        description:'',
        marks:''
      },
      file:null,
    }
  },
  mounted() {
    this.log()
  },
  methods:{
    back(){
      window.history.go(-1)
    },
    log(){
      this.axios.post('log', {pageName:'Answer Assignment'}).then(resp => {
        return resp
      }).catch(e =>{
        return e
      })
    },
    onImageChange(e){
      this.file = e.target.files[0];
    },
    answer(){
      const config = {
        headers: { 'content-type': 'multipart/form-data'}
      }
      let formData = new FormData();
      formData.append('assignmentId', this.Taskid)
      formData.append('file_name', this.file)
      this.axios.post('/answer-task', formData, config)
        .then((response) => {
          this.file=null
          this.error=''
          this.$router.push({name: "UserDashboard"});
        }).catch( error => {
        this.error = 'attache a file';

      });
    }
  }
}
</script>

<style scoped>
.dashboard{
  min-height: 100vh;
  background-color: #324960;

}
.btn{
  border: none;
  color: white;
}
</style>
