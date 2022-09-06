<template>
  <div>
    <div class="dashboard">
      <dashboard-nav/>
      <div style="width: 90%;background-color: #324960; padding-top: 80px">
        <div style="box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 1);margin: 25px;padding: 15px 10px 15px 10px; background-color: white; border-radius: 20px">
          <h4 style="text-align: center">Assignments</h4> <hr>
          <div  style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1);  margin: 20px auto; text-align: center; padding: 10px" v-for="task in tasks">
            <h3 >{{task.user.name}}</h3>
            <h3 >{{task.title}}</h3>
            <div style=" word-wrap: break-word;">
              {{ task.description }}
            </div>
            <p>Marks: {{task.mark}}</p>
            <p>Deadline: {{task.date}}</p>
            <p>Created: {{moment(task.created_at).format('YYYY-MM-DD')}}</p>
            <expandable-image :src="`http://127.0.0.1:8000/`+task.file" class="shadow-lg p-3 bg-white rounded image" height="100%" width="100%" />

            <div class="flex-wrap" v-for="i in task.student_assignment" style="margin-top: 10px; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1); ">
              <h5>Answers</h5>
              {{i.user_id}}
              <expandable-image  :src="`http://127.0.0.1:8000/`+i.file_name" class="shadow-lg p-3 bg-white rounded image" height="100%" width="100%" />
<!--                      {{i.verified}}-->
              <b-button variant="danger" v-if="i.verified===0" @click=verify(i.id)> Verified </b-button>
              <p v-if="i.verified===1" style="color: green"> Verified </p>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "TaskAnswer",
  data(){
    return{
      moment: moment,
      taskId:this.$route.params.id,
      tasks:[],
      answers:[]
    }
  },
  mounted() {
    this.getTask(this.taskId)
  },
  methods:{
    getTask(id){
      this.axios.get(`/task/${id}`).then(response =>{
        this.tasks = response.data
      }).catch(e=>{
        this.error = e
      })
    },
    verify(id){
      this.axios.put(`verify/${id}`).then(response =>{
        if(response){
          window.location.reload()

        }
      })
    }


  }
}
</script>

<style scoped>
.image{
  height: 100px;
  width: 100px;
}
.dashboard{
  background-color: #324960;
  min-height: 100vh;
  /*min-height: 100vh;*/
}
</style>
