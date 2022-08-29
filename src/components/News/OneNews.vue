<template>
    <div class="">
      <div class="cart" style="width: 20rem;border-radius: 15px; background-color: #e0d5d5; padding: 5px">
        <h3 style="color:white;">{{item.title}}</h3>
        <p style="color:white; width: 100%">
          {{ item.body }}
        </p>

        <b-button variant="warning"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-news/'+item.id}">Edit</router-link>  </b-button>
        <b-button variant="danger" @click=deleteNews(item.id)> Delete </b-button>
      </div>
  </div>
</template>

<script>
export default {
  props: ['news'],

  data(){
    return{
      item:this.news
    }
  },
  methods:{
    deleteNews(id){
      this.axios.delete(`/delete-news/${id}`).then(response =>{
        let i = this.news.map(data => data.id).indexOf(id)
        this.news.splice(i, 1)
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
.cart{
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYKWaMjYvTGz0fsI-M1t5act0Ur3W-MWmOZVgva_dy0FqXgwp0G0z0cnfxe8ghJXkzt4&usqp=CAU");
  background-repeat: no-repeat;
  background-size: auto;
}
</style>
