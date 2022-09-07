<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; padding-top: 90px ">
      <aside-navbar style="width: 25%; background-color: white; margin-right: 15px"/>
      <div   style="height: 100vh; overflow: scroll;width: 100%; background-color: white; padding: 15px ">
        <div style="display: flex; justify-content: space-between">
          <h1 style="width: 100%; margin-bottom: 25px">All Statistics page student</h1>
          <input type="text" name="search" placeholder="Search user by page name" class="form-control search" v-model="keyword">

          <!--          <router-link to="/add-teacher">Add Teacher</router-link>-->
        </div>
        <table style="width: 100%; border: 1px solid black;">
          <tr style="width: 60%; border: 1px solid black">
            <th>No</th>
            <th>Id</th>
            <th>Page Name</th>
            <th>Student email</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
          <tr v-for="(log, index) in logs" :key="index" style="width: 60%; border: 1px solid black">
            <td style="padding: 5px">{{ incrementIndex(index) }}</td>
            <td style="padding: 5px">{{log.id}}</td>
            <td style="padding: 5px">{{log.page_name}}</td>
            <td style="padding: 5px">{{log.user.email}}</td>
            <td style="padding: 5px">{{ moment(log.created_at).format("DD-MM-YYYY")}}</td>
            <td style="padding: 5px">{{ moment(log.created_at).format("h:mm:ss")}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "StatisticsPage",
  data () {
    return {
      moment:moment,
      searchUser:'',
      logs:[],
      keyword: null,
    }
  },
  watch: {
    keyword(after, before) {
      this.getResultLog()    }
  },
  mounted() {
    this.getResult()
  },

  methods: {
    incrementIndex(key) {
      return key + 1;
    },
    getResult() {
      this.axios.get('/get-logs').then((res) => {
        this.logs = res.data
        // return resolve(true);
      }).catch(error=> {
        return error

      })
    },
    getResultLog() {
      this.axios.get('/get-logs-user-name', { params: { keyword: this.keyword } }).then((res) => {
        this.logs = res.data
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
th{
  background-color: #74b9ea;
}
.search{
  height: 50px;
}
</style>
