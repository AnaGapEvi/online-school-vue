<template>
  <div class="dashboard">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 60px">
      <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">
        <aside-navbar/>
      </div>
      <div style="width: 78%; margin-top: 25px; background-color: #324960">
        <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
          <h4>Edit Assignment</h4>
          <div>
            <router-link to="/teacher-dashboard" style="text-decoration: none; color: black">Dashboard</router-link> /
            <router-link to="" style="text-decoration: none; color: gray">Assignment Information</router-link>
          </div>
        </div>
        <div style="background-color: white;margin-bottom: 15px;padding: 15px 10px 15px 10px;">
          <h4>Assignment Information</h4>
          <div>
            <div style="width: 100%; height: 80%; background-color: white; border-radius: 15px">
              <validation-observer ref="observer" style="width: 100%;">
                <b-form enctype="multipart/form-data" style="display: flex">
                  <div style="width: 100%; padding: 15px">
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
                        <select v-model="assignment.course_id" >
                          <option v-for="course in courses" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="course.id " v-bind:value="course.id"> {{course.name}}</option>
                        </select>
                      </b-form-group>
                    </validation>
                    <validation
                      name="title"
                      rules="required"
                    >
                      <b-form-group
                        label-class="form-label"
                        label="Assignment Title"
                        label-for="title"
                        slot-scope="{ errors }"
                        :invalid-feedback="errors[0]"
                      >
                        <b-form-input
                          id="title"
                          type="text"
                          v-model="assignment.title"
                          :state="errors[0] ? false : null"
                          trim
                        />
                      </b-form-group>
                    </validation>
                    <validation
                      name="date"
                      rules="required"
                    >
                      <b-form-group
                        label-class="form-label"
                        label="Last Date of Submission"
                        label-for="date"
                        slot-scope="{ errors }"
                        :invalid-feedback="errors[0]"
                      >
                        <b-form-input
                          id="date"
                          v-model="assignment.date"
                          type="date"
                          :state="errors[0] ? false : null"
                          trim
                        />
                      </b-form-group>
                    </validation>
                  </div>
                  <div style="width: 100%; padding: 15px">
                    <validation
                      name="subject"
                      rules="required"
                    >
                      <b-form-group
                        id="input-group-5"
                        label="Subject:"
                        label-for="input-5"
                        slot-scope="{ errors }"
                        :invalid-feedback="errors[0]"
                      >
                        <select v-model="assignment.subject_id" >
                          <option v-for="subject in subjects" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="subject.id " v-bind:value="subject.id"> {{subject.name}}</option>
                        </select>
                      </b-form-group>
                    </validation>
                    <validation
                      name="Assignment Description"
                      rules="required"
                    >
                      <b-form-group
                        label-class="form-label"
                        label="Assignment Description"
                        label-for="description"
                        slot-scope="{ errors }"
                        :invalid-feedback="errors[0]"
                      >
                        <b-form-textarea
                          id="description"
                          v-model="assignment.description"
                          :state="errors[0] ? false : null"
                          trim
                        ></b-form-textarea>
                      </b-form-group>
                    </validation>
                    <validation
                      name="Assignment Marks"
                      rules="required"
                    >
                      <b-form-group
                        label-class="form-label"
                        label="Assignment Marks"
                        label-for="marks"
                        slot-scope="{ errors }"
                        :invalid-feedback="errors[0]"
                      >
                        <b-form-input
                          type="text"
                          id="marks"
                          v-model="assignment.mark"
                          :state="errors[0] ? false : null"
                          trim
                        />
                      </b-form-group>
                    </validation>
                    <div class="mt-3">
                      <b-button variant="warning" @click="formSubmit()">Save</b-button>
                    </div>
                    <span style="color: #e59898" v-if="error!==''">{{error}}</span>
                  </div>
                </b-form>
              </validation-observer>
            </div>
          </div>
        </div>
        <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditAssignment",
  data () {
    return {
      assignment: {},
      courses:[],
      subjects:[],
      id:this.$route.params.id,
      error:''
    }
  },
  mounted() {
    this.get_assignment();
    this.getCourse()
    this.getSubject()
  },
  methods:{
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
    get_assignment(){
      this.axios.get(`/assignment-get/` + this.id).then(response =>{
        this.assignment=response.data
      }).catch(e=>{
        console.log(e)
      })
    },

    onImageChange(e){
      this.file = e.target.files[0];
    },
    formSubmit(){
      // e.preventDefault();
      const config = {
        headers: { 'content-type': 'multipart/form-data'}
      }

      this.axios.put(`/edit-assignment/`+this.$route.params.id, this.assignment)
        .then((response) => {
          if(response){
            this.$router.push({name: "TeacherDashboard"})
          }
        }).catch( error => {
        this.error=error;
      });
    }
  }
}
</script>

<style scoped>
.dashboard{
  background-color: #324960;
}
</style>
