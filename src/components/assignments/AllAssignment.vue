<template>
  <div class="news">
      <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
      <div style="display: flex; justify-content: space-between; padding-top: 90px">
        <aside-navbar style="width: 20%;"/>
        <div style="width: 78%; background-color: #324960">
          <div style="margin-bottom: 15px;padding: 15px 10px 15px 10px; background-color: white;display: flex; justify-content: space-between">
            <h4>All Assignments</h4>
          </div>
          <div style="display:flex;flex-wrap: wrap; justify-content: center; background-color: white; margin-bottom: 15px;padding: 15px 0 ">
            <div style="margin: 5px; width: 45%" v-for="item in assignments"
                 :key="item.id"
            >
              <div class="cart" style="padding:15px; border-radius: 15px; background-color: #e0d5d5;">
                <img src="">

                <h5 >{{item.title}}</h5>
                <p style="word-wrap: break-word; width: 100%">
                  {{ item.description }}
                </p>
                <p>Marks: {{item.mark}}</p>
                <p>Deadline: {{item.date}}</p>
                <p>Created: {{ moment(item.created_at).format('YYYY-MM-DD')}}</p>
                <p>{{item.user.name}}</p>
                <!--      <img :src="`http://127.0.0.1:8000/`+item.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">-->
                <img src="https://assignmentstudio3.b-cdn.net/wp-content/uploads/2018/01/tips.png" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">
                <b-button variant="warning" v-if="role==='teacher'"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-assignment/'+item.id}">Edit</router-link>  </b-button>
                <b-button variant="danger"  @click=deleteAssignment(item.id)> Delete </b-button>
              </div>
            </div>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
        </div>
      </div>
    </div>
</template>

<script>
import OneAssignment from "./OneAssignment";
import moment from "moment";

export default {
  name: "AllAssignments",
  components: {OneAssignment},
  data(){
    return{
      moment:moment,
      assignments:[],
      role:'',
      email:''
    }
  },
  mounted() {
    this.getAssignment()
    this.getMy()
  },
  methods:{
    getMy(){
      return new Promise((resolve, reject) => {
        this.axios.get('/me')
          .then(result => {
            this.email = result.data.user.email
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    getAssignment() {
      return new Promise((resolve, reject) => {
        this.axios.get('assignments').then((res) => {
          this.assignments = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteAssignment(id){
      this.axios.delete(`/delete-assignment/${id}`).then(response =>{
       this.getAssignment()
        // this.assignments = this.assignments.filter((e) => {
        //   return e.id !== id;
        // });
        return response
      }).catch(e =>{
        return e
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
</style>


