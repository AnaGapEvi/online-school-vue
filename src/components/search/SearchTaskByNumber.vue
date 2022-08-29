<template>
  <div>
    <h5>Search By Task Number</h5>
    <div style="border-radius: 50px;padding: 5px; border: 1px solid deepskyblue ">
      <b-icon style="margin-right: 15px" icon="search" scale="1" variant="Secondary"></b-icon>
      <input type="text" placeholder="Enter Teacher name ......." v-model="keyword" style="border: none; width: 95%;">
    </div>
    <div v-if="Tasks.length > 0">

      <div v-for="task in Tasks" :key="task.id" >
        <div class="cart" style="padding:15px; border-radius: 15px; background-color: #e0d5d5;">
          <h3> <b> {{task.title}} </b></h3>
          <p> <b> Subject: </b> {{task.subject.name}}</p>

          <p style=" width: 100%"> <b>Description </b>
            {{ task.description }}
          </p>
          <p> <b>Marks:</b> {{task.mark}}</p>
          <p> <b>Deadline: </b>{{task.date}}</p>
          <p> <b> Created: </b>{{task.created_at}}</p>
          <img :src="`http://127.0.0.1:8000/`+task.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">

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
      this.axios.get('/number-livesearch', { params: { keyword: this.keyword } })
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
