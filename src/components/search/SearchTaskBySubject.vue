<template>
  <div>
    <h5>Search task by subject name</h5>
    <div style="border-radius: 50px;padding: 5px; border: 1px solid deepskyblue ">
      <b-icon style="margin-right: 15px" icon="search" scale="1" variant="Secondary"></b-icon>
      <input type="text" placeholder="Search name ......." v-model="keyword" style="border: none; width: 95%;">
    </div>
    <div v-if="Tasks.length > 0">
      <div v-for="task in Tasks" :key="task.id">
        <div class="cart" style="padding:15px; margin: 15px; border-radius: 15px; background-color: #e0d5d5;" v-for="assignment in task.assignments" :key="assignment.id">
          <h5 style="color: deepskyblue"> <b> {{task.name}} </b></h5>
          <hr>
          <h6> <b> {{assignment.title}} </b></h6>
          <p style=" width: 100%"> <b>Description </b>{{ assignment.description }}</p>
          <p><b>Marks:</b> {{assignment.mark}}</p>
          <p><b>Deadline: </b>{{assignment.date}}</p>
          <p><b> Created: </b>{{ moment(assignment.created_at).format("DD-MM-YYYY")}}</p>

          <p style="padding: 5px"><b>Time: </b> {{ moment(assignment.created_at).format("h:mm:ss")}}</p>
          <img :src="`http://127.0.0.1:8000/`+assignment.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">
          <span v-if="empty===true">There is no such object or the object has no task</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";


export default {
  data() {
    return {
      moment:moment,
      keyword: null,
      Tasks: [],
      empty:false,

    };
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    }
  },
  methods: {
    getResults() {
      if(this.keyword.length){
      this.axios.get('/subject-livesearch', { params: { keyword: this.keyword } })
        .then(res => {
          if (res){
            this.Tasks = res.data
          }else {
            this.empty=true
          }
        })
        .catch(error => {
          return error
        })
      } else {

        this.Tasks = []
      }
    }
  }
}
</script>
