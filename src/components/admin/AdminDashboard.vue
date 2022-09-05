<template>
  <div class="admin">
      <dashboard-nav/>
      <div style="display: flex; padding-top: 80px; justify-content: space-between;">
          <aside-navbar style="width: 20%;"/>
        <div class="dashboard">
<!--          <search-task-by-subject></search-task-by-subject>-->
          <search-task-by-number></search-task-by-number>
        </div>
      </div>
  </div>

</template>

<script>
import SearchByTeacherName from "../search/SearchByTeacherName";
import SearchTaskByNumber from "../search/SearchTaskByNumber";
import SearchTaskBySubject from "../search/SearchTaskBySubject";
export default {
  name: 'AdminDashboard',
  components:{SearchTaskBySubject, SearchTaskByNumber, SearchByTeacherName},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin{
  background-color: #324960;
  /*min-height: 100vh;*/
}
.dashboard{
  background-image: url("https://www.cedefop.europa.eu/files/images/headline_coronavirus_interest_online_learning_002.jpg");;
  /*background-repeat: no-repeat;*/
  background-size: 100%;
  width: 78%;
  padding: 15px;
}
</style>
