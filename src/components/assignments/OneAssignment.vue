<template>
  <div class="">
    <div class="cart" style="padding:15px; border-radius: 15px; background-color: #e0d5d5;">
      <img src="">

      <h5 >{{item.title}}</h5>
      <p style="word-wrap: break-word; width: 100%">
        {{ item.description }}
      </p>
      <p>Marks: {{item.mark}}</p>
      <p>Deadline: {{item.date}}</p>
      <p>Created: {{ moment(item.created_at).format('YYYY-MM-DD')}}</p>
      <p>{{item.user.name}}</p>
<!--      <img :src="`http://127.0.0.1:8000/`+item.file" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">-->
      <img src="https://assignmentstudio3.b-cdn.net/wp-content/uploads/2018/01/tips.png" class="shadow-lg p-3 bg-white rounded" height="100px" width="100px">
      <b-button variant="warning" v-if="role==='teacher'"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-assignment/'+item.id}">Edit</router-link>  </b-button>
      <b-button variant="danger"  @click=deleteAssignment(item.id)> Delete </b-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "OneAssignment",
  props: ['assignment'],
  data(){
    return{
      moment:moment,
      item:this.assignment,
      role:''
    }
  },
  methods:{
    getMy(){
      return new Promise((resolve, reject) => {
        this.axios.get('/me')
          .then(result => {
            this.email = result.data.user.email
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    deleteAssignment(id){
      this.axios.delete(`/delete-assignment/${id}`).then(response =>{
        window.location.reload()
        return response
      }).catch(e =>{
        return e
      })

    },
  }
}
</script>

<style scoped>
.cart{
  background-color: #e0d5d5;
  color:black;
}
p{
  font-size: 13px;
}
</style>
