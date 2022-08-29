<template>
  <div class="subjects" style="box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); ">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 90px ">
      <aside-navbar style="  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); width: 18%; background-color: white; margin-right: 15px"/>
      <div  style="text-align: center;  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); min-width: 80%; background-color: antiquewhite; padding: 15px ">
        <form method="get">
          <select :value="form.subject_id" v-model="form.subject_id" style="border: 2px solid darkblue; padding: 8px; border-radius: 5px; width: 30%">
            <option selected="selected">Subject</option>
            <option v-for="subject in subjects" style="width: 80%; border-radius: 5px; padding: 5px; margin-top: 5px" :key="subject.id " v-bind:value="subject.id" >
              {{subject.name}}
            </option>
          </select>
          <input style="padding: 6px; border-radius: 5px" type="date" name="start" v-model="form.start">
          <input style="padding: 6px; border-radius: 5px" type="date" name="end" v-model="form.end">
          <b-button variant="dark" @click.p.prevent="getReports()">Get Reports</b-button>
        </form>
          <div class="table-wrapper" style="margin-top: 50px">
            <table class="fl-table" v-if="reports.length>0" >
              <tr style="width: 60%; border: 1px solid black">
                <th>Number task</th>
                <th>title</th>
                <th style="width: 50% ">description</th>
                <th>Created</th>
                <th>Date</th>
              </tr>
              <tr v-for="report in reports" :key="report.id" style="width: 60%; border: 1px solid black">
                <td style="padding: 5px">{{  report.id}}</td>
                <td style="padding: 5px">{{ report.title}}</td>
                <td style="padding: 5px; ">{{ report.description}}</td>
                <td style="padding: 5px">{{ moment(report.created_at).format("YYYY-MM-DD")}}</td>
                <td style="padding: 5px">{{ report.date}}</td>
              </tr>
            </table>
          </div>
        <b-table striped hover :items="errors" ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ReportAssignment",
  data(){

    return{
      moment: moment,
      form:{
        start:'',
        end:'',
        subject_id:''
      },
      reports:[],
      errors:[],
      subjects:[],

    }
  },

  mounted() {
    this.getSubjects()

  },
  methods:{
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
    getReports(){
      this.axios.post('/reports', this.form).then((res) => {
        if(res){
          this.reports = res.data
        } else {
          alert("this reports not found")
        }
      })
        .catch((e) =>{
          this.errors.push('this reports not found')
        })

    },
  }
}
</script>

<style scoped>
.subjects{
  /*padding: 15px;*/
  min-height: 100vh;
  background-color: #324960;
}
.table-wrapper{
  box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: white;
}

.fl-table td, .fl-table th {
  text-align: center;
  padding: 8px;
}

.fl-table td {
  border-right: 1px solid #f8f8f8;
  font-size: 12px;
}

.fl-table thead th {
  color: #ffffff;
  background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
  color: #ffffff;
  background: #324960;
}

.fl-table tr:nth-child(even) {
  background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
  .fl-table {
    display: block;
    width: 100%;
  }
  .table-wrapper{
    margin-top: 30px;
  }
  .table-wrapper:before{

    content: "Scroll horizontally >";
    display: block;
    text-align: right;
    font-size: 11px;
    color: white;
    padding: 0 0 10px;
  }
  .fl-table thead, .fl-table tbody, .fl-table thead th {
    display: block;
  }
  .fl-table thead th:last-child{
    border-bottom: none;
  }
  .fl-table thead {
    float: left;
  }
  .fl-table tbody {
    width: auto;
    position: relative;
    overflow-x: auto;
  }
  .fl-table td, .fl-table th {
    padding: 20px .625em .625em .625em;
    height: 60px;
    vertical-align: middle;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    width: 120px;
    font-size: 13px;
    text-overflow: ellipsis;
  }
  .fl-table thead th {
    text-align: left;
    border-bottom: 1px solid #f7f7f9;
  }
  .fl-table tbody tr {
    display: table-cell;
  }
  .fl-table tbody tr:nth-child(odd) {
    background: none;
  }
  .fl-table tr:nth-child(even) {
    background: transparent;
  }
  .fl-table tr td:nth-child(odd) {
    background: #F8F8F8;
    border-right: 1px solid #E6E4E4;
  }
  .fl-table tr td:nth-child(even) {
    border-right: 1px solid #E6E4E4;
  }
  .fl-table tbody td {
    display: block;
    text-align: center;
  }
}
</style>
