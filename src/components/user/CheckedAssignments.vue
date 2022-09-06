<template>
  <div class="news">
    <div >
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; padding-top: 60px">
<!--        <div style="width: 20%;margin-top: 25px; margin-bottom: 15px">-->
<!--          <aside-navbar/>-->
<!--        </div>-->
        <div style="width: 80%; margin: 25px auto; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>Checked Assignments</h4>
            <button @click.prevent="back()">  X </button>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <div v-for="i in checkedAssignments" style="border: #324960 1px solid; margin: 5px ; padding: 5px; border-radius: 7px">
              <h3>{{i.assignment.title}}</h3>
              <p>Task number: {{i.assignment.id}}</p>

              <expandable-image :src="`http://127.0.0.1:8000/`+i.file_name" class="shadow-lg p-3 bg-white rounded image" height="100%" width="100%" />

              <p v-if="i.verified=='1'" style="color: green"><b> verified</b></p>
              <p v-if="i.verified=='0'" style="color: red"><b> unverified</b></p>
              <div v-for="item in i.assignment">
                <p>{{ item.title }}</p>
                <p >{{ item.description }}</p>
              </div>

            </div>

          </div>

          <footer> <p>This dashboard was generated on OCAS </p></footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckedAssignments",
  data(){
    return{
      checkedAssignments:[]
    }
  },
  mounted() {
    this.log()
    this.getCheckedAssignments()
  },
  methods:{
    back(){
      window.history.go(-1)
    },
    log(){
      this.axios.post('log', {pageName:'Checked Assignments'}).then(resp => {
        return resp
      }).catch(e =>{
        return e
      })

    },
    getCheckedAssignments() {
      return new Promise((resolve, reject) => {
        this.axios.get('/checked-student-assignments').then((res) => {
          this.checkedAssignments = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news{
  /*display: flex;*/
  /*justify-content: ;*/
  /*align-items: center;*/
  min-height: 100vh;
  background-color: #324960;
}
.image{
  width: 150px;
  height: 150px;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: black;
  text-align: center;
}
</style>



