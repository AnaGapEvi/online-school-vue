<template>
  <div class="subjects">
    <dashboard-nav/>
    <div style="display: flex; padding-top: 80px">
      <aside-navbar style="width: 30%; background-color: white; margin-right: 15px"/>
      <div  style="width: 100%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1>All Subjects</h1>
          <router-link to="/new-subject">Add Subject</router-link>
        </div>
        <div>
          <div style="border-radius: 50px;padding: 5px; border: 1px solid deepskyblue; margin: 15px 0 ">
            <b-icon style="margin-right: 15px" icon="search" scale="1" variant="Secondary"></b-icon>
            <input type="text" placeholder="Search By Subject ......." v-model="keyword" style="outline: none; border: none; width: 95%;">
          </div>
          <div v-if="Tasks.length > 0">
            <div v-for="task in Tasks" :key="task.id" >
              <div class="cart" style="padding:15px; margin: 15px; border-radius: 15px; background-color: #e0d5d5;" v-for="assignment in task.assignments" :key="assignment.id">
                <h5 style="color: deepskyblue"> <b> {{task.name}} </b></h5>
                <h6> <b> {{assignment.title}} </b></h6>
                <p style=" width: 100%"> <b>Description </b>{{ assignment.description }}</p>
                <p><b>Marks:</b> {{assignment.mark}}</p>
                <p><b>Deadline: </b>{{assignment.date}}</p>
                <p><b> Created: </b>{{ moment(assignment.created_at).format(YYYY-mm-dd)}}</p>
                <expandable-image :src="`http://127.0.0.1:8000/`+assignment.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px"></expandable-image>
              </div>
            </div>
          </div>
        </div>
        <table style="width: 100%; border: 1px solid black;">
          <tr style="width: 60%; border: 1px solid black">
            <th>No</th>
            <th>Name</th>
            <th style="text-align: center; padding: 5px">Edit</th>
            <th style="text-align: center; padding: 5px">Delete</th>
          </tr>
          <tr v-for="(subject, index) in subjects" :key="index" style="width: 60%; border: 1px solid black">
            <td style="padding: 5px">{{ incrementIndex(index) }}</td>
            <td style="padding: 5px">{{ subject.name}}</td>
            <td style="text-align: center; padding: 5px"><b-button variant="warning">  Edit </b-button></td>
            <td style="text-align: center; padding: 5px"><b-button @click="deleteSubject(subject.id)" variant="danger">  Delete </b-button>
            </td>
          </tr>
        </table>
    </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "AllSubjects",
  data () {
    return {
      moment:moment,
      subjects:[],
      count:1,
      keyword: null,
      Tasks: []
    }
  },

  mounted() {
    this.getSubjects()
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    }
  },
  methods: {
    incrementIndex(key) {
      return key + 1;
    },
    getResults() {
      if(this.keyword.length){
        this.axios.get('/subject-livesearch', { params: { keyword: this.keyword } })
          .then(res => {
            this.Tasks = res.data
          })
          .catch(error => {
            return error
          })
      } else {
        this.Tasks = []
      }
    },
    getSubjects() {
      return new Promise((resolve, reject) => {
        this.axios.get('subjects').then((res) => {
          this.subjects = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteSubject(id){
      this.axios.delete(`/delete-subject/${id}`).then(response =>{
        let i = this.subjects.map(data => data.id).indexOf(id)
        this.subjects.splice(i, 1)
        // this.loadSharesData()

        // window.location.reload()
        return response
      }).catch(e =>{
        return e
      })

    },

  }
}
</script>

<style scoped>
th{
  background-color: #74b9ea;
}
tr:hover{
  background:#BDC3C7;
  color:#FFFFFF;
}
.subjects{
  /*padding: 15px;*/
  background-color: #324960;
  min-height: 100vh;
}
</style>
