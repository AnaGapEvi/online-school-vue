<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; padding-top: 90px " ref="hasScrolledToBottom">
      <aside-navbar style="width: 30%; background-color: white; margin-right: 15px"/>
      <div  style="width: 100%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1>All Teachers</h1>
          <router-link to="/add-teacher">Add Teacher</router-link>
          </div>
          <div>
            <div style="border-radius: 50px;padding: 5px; border: 1px solid deepskyblue; margin: 15px 0 ">
              <b-icon style="margin-right: 15px" icon="search" scale="1" variant="Secondary"></b-icon>
              <input type="text" placeholder="Search task by teacher name ......." v-model="keyword" style="border: none; width: 95%;">
            </div>

            <div v-if="Tasks.length > 0">

              <div v-for="task in Tasks" :key="task.id" >

                <div class="cart" style="padding:15px; margin: 15px; border-radius: 15px; background-color: #324960;" v-for="assignment in task.assignments" :key="assignment.id">

                  <h5 style="color: deepskyblue"> <b> {{task.name}} </b></h5>
                  <h6> <b> {{assignment.title}} </b></h6>

                  <p style=" width: 100%"> <b>Description </b>
                    {{ assignment.description }}
                  </p>
                  <p> <b>Marks:</b> {{assignment.mark}}</p>
                  <p> <b>Deadline: </b>{{assignment.date}}</p>
                  <p> <b> Created: </b>{{assignment.created_at}}</p>
                  <img :src="`http://127.0.0.1:8000/`+assignment.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">

                </div>
              </div>
          </div>
        </div>
        <table style="width: 90%; border: 1px solid black;">
          <tr style="width: 60%; border: 1px solid black">
            <th>No</th>
            <th>Teachers</th>
            <th>email</th>
            <th >Course</th>
            <th>Mobile</th>
            <th style="text-align: center; padding: 5px">Edit</th>
          </tr>
          <tr v-for="(teacher, index) in teachers" :key="index" style="width: 60%; border: 1px solid black">
            <td style="padding: 5px">{{ incrementIndex(index) }}</td>
            <td style="padding: 5px">{{ teacher.name}}</td>
            <td style="padding: 5px">{{ teacher.email}}</td>
            <td style="padding: 5px">
              <ul style="list-style-type: none; margin: 0" v-for="course in teacher.courses">
                <li>{{ course.name}}</li>
              </ul>
            </td>
            <td style="padding: 5px">+374-{{ teacher.mobile}}</td>
            <td style="text-align: center; padding: 5px"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-teacher/'+teacher.id}"><b-button variant="warning">  Edit</b-button></router-link> </td>
          </tr>
        </table>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AllTeachers",
  data () {
    return {
      teachers:[],
      keyword: null,
      Tasks: [],
      hasScrolledBottom:'',

    }
  },
  mounted() {
    this.getTeachers()
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
    getTeachers() {
        this.axios.get('all-teachers').then((res) => {
          this.teachers = res.data
          // return resolve(true);
        }).catch(error=> {
          return error

      })
    },
    getResults() {
      if(this.keyword.length){
        this.axios.get('/name-livesearch', { params: { keyword: this.keyword } })
          .then(res =>{
            this.Tasks = res.data
            this.$nextTick(() => {
              this.$refs.hasScrolledToBottom.scrollTo(0, this.$refs.hasScrolledToBottom.scrollHeight);
            });
          } )
          .catch(error => {
            return error
          });
      } else {
        this.Tasks = []
      }
    }

  }
}
</script>

<style scoped>
p{
  color: white;
}
.subjects{
  /*padding: 15px;*/
  background-color: #324960;
  height: 100%;
}
</style>
