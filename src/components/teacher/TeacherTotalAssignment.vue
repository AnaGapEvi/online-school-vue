<template>
    <div class="dashboard">
      <dashboard-nav />
      <div style="display: flex; justify-content: space-between; padding-top: 80px">
        <aside-navbar style="width: 18%;"/>
        <div style="width: 80%; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>Total Assignment</h4>
            <div>
              <router-link to="/teacher-dashboard" style="text-decoration: none; color: gray">Dashboard</router-link> /
              <router-link to="/total-assignment" style="text-decoration: none; color: black">Total Assignments</router-link>
            </div>
          </div>
          <div style="width: 100%; background-color: white; padding: 15px">
            <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
              <div style="max-width: 30% ;margin: 5px" v-for="item in assignments"
                   :key="item.id"
              >
                <div class="cart" style="padding:15px; border-radius: 15px; background-color: #324960; color:  white">
                  <h5 >{{item.title}}</h5>
                  <p style=" width: 100%; word-wrap: break-word;">{{ item.description }} </p>
                  <p>Marks: {{item.mark}}</p>
                  <p>Deadline: {{item.date}}</p>
                  <p>Created: {{ moment(item.created_at).format("DD-MM-YYYY")}}</p>
                  <expandable-image :src="`http://127.0.0.1:8000/`+item.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px"></expandable-image>
                  <p></p>
                  <b-button variant="warning"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-assignment/'+item.id}">Edit</router-link>  </b-button>
                  <b-button variant="danger" @click=deleteAssignment(item.id)> Delete </b-button>
                  <router-link :to="/task/+item.id">
                    <b-button variant="info"> See the answers </b-button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer> <p>This dashboard was generated on OCAS </p></footer>
    </div>
</template>

<script>
import moment from "moment";
import OneAssignment from "../assignments/OneAssignment";
export default {
  name: "TeacherTotalAssignment",
  components: {OneAssignment},
  data(){
    return{
      moment:moment,
      assignments:[]
    }
  },
  mounted() {
    this.getAssignment()
  },
  methods:{
    getAssignment(){
      return new Promise((resolve, reject) =>{
        this.axios.get('assignment-teacher').
        then((res)=>{
          this.assignments=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
      })
    },
    deleteAssignment(id){
      this.axios.delete(`/delete-assignment/${id}`).then(response =>{
        let i = this.assignments.map(data => data.id).indexOf(id)
        this.assignments.splice(i, 1)
        return response
      }).catch(e =>{
        return e
      })
    }
  }
}
</script>

<style scoped>
.dashboard{
  background-color: #324960;
  min-height: 100vh;
}
p{
  font-size: 15px;
}
footer {
  /*position: fixed;*/
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: black;
  text-align: center;
  margin-top: 20px;
  padding-top: 10px;
}
</style>
