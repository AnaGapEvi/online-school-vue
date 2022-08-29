<template>
  <div>
    <h5>Search By teacher Name</h5>
    <div style="border-radius: 50px;padding: 15px; border: 1px solid deepskyblue ">
      <b-icon style="margin-right: 15px" icon="search" scale="1" variant="Secondary"></b-icon>

      <input type="text" placeholder="Enter Teacher name ......." v-model="keyword" style="border: none">

    </div>

    <div v-if="Tasks.length > 0">

      <div v-for="task in Tasks" :key="task.id" >

        <div class="cart" style="padding:15px; margin: 15px; border-radius: 15px; background-color: #e0d5d5;" v-for="assignment in task.assignments" :key="assignment.id">

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
</template>
<script>
export default {
  data() {
    return {
      keyword: null,
      Tasks: []
    };
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    }
  },
  methods: {
    getResults() {
      console.log(this.keyword.length)
      if(this.keyword.length){
      this.axios.get('/name-livesearch', { params: { keyword: this.keyword } })
        .then(res => this.Tasks = res.data)
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
