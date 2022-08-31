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
            <div style="margin: 5px; width: 45%" v-for="i in assignments"
                 :key="i.id"
            >
              <one-assignment :assignment="i" />
            </div>
          </div>
          <div style="background-color: white;padding: 15px 10px 15px 10px; text-align: center">This dashboard was generated on OCAS</div>
        </div>
      </div>
    </div>
</template>

<script>
import OneAssignment from "./OneAssignment";
export default {
  name: "AllAssignments",
  components: {OneAssignment},
  data(){
    return{
      assignments:[]
    }
  },
  mounted() {
    this.getAssignment()
  },
  methods:{
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


