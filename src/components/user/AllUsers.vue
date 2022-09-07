<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex;justify-content: space-between;padding-top: 90px ">
      <aside-navbar style="width: 20%;"/>
      <div  style="width: 78%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1>All Students</h1>
          <router-link to="/add-teacher">Add Teacher</router-link>
        </div>
        <table style="width: 100%; border: 1px solid black;">
          <tr style="width: 60%; border: 1px solid black">
            <th>No</th>
            <th>Name</th>
            <th>email</th>
            <th>role number</th>
            <th style="text-align: center">courses</th>
<!--            <th>Subjects</th>-->
            <th>Mobile</th>
<!--            <th style="text-align: center; padding: 5px">Edit</th>-->
          </tr>
          <tr v-for="(student, index) in users" :key="index" style="width: 60%; border: 1px solid black">
            <td style="padding: 5px">{{ incrementIndex(index) }}</td>
            <td style="padding: 5px">{{ student.name}}</td>
            <td style="padding: 5px">{{ student.email}}</td>
            <td style="padding: 5px">{{ student.role_number}}</td>
            <td style="padding: 5px">
              <ul style="list-style-type: none; margin: 0" v-for="course in student.courses">
                <li>{{ course.name}}</li>
              </ul>
            </td>
            <td style="padding: 5px">+374-{{ student.mobile}}</td>
<!--            <td style="text-align: center; padding: 5px"><b-button variant="warning"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-teacher/'+student.id}">  Edit</router-link> </b-button></td>-->
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
      users:[],
    }
  },
  mounted() {
    this.getTeachers()
  },

  methods: {
    incrementIndex(key) {
      return key + 1;
    },
    getTeachers() {
        this.axios.get('all-users').then((res) => {
          this.users = res.data
          // return resolve(true);
        }).catch(error=> {
          return error

      })
    },

  }
}
</script>

<style scoped>
.subjects{
  /*padding: 15px;*/
  background-color: #324960;
  height: 100%;
}
tr:hover{
  background:#BDC3C7;
  color:#FFFFFF;
}
</style>
