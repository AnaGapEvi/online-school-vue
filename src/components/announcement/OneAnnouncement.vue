<template>
    <div class="">
      <div class="cart" style="width: 20rem;border-radius: 15px; background-color: #e0d5d5; padding: 5px">
        <h3 style="color:black; text-align: right">{{item.title}}</h3>
        <p style="word-wrap: break-word; color:black; text-align: right; width: 100%">
          {{ item.body }}
        </p>
        <b-button variant="warning"><router-link style="text-decoration: none; color: white" :to="{path: '/edit-announcement/'+item.id}">Edit</router-link>  </b-button>
        <b-button variant="danger" @click=deleteAnnouncement(item.id)> Delete </b-button>
      </div>
  </div>
</template>

<script>
export default {
  props: ['announcement'],

  data(){
    return{
      item:this.announcement
    }
  },
  methods:{
    deleteAnnouncement(id){
      this.axios.delete(`/delete-announcement/${id}`).then(response =>{
        // delete this.item
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
  background-image: url("https://static.vecteezy.com/system/resources/thumbnails/002/929/799/small/realistic-style-megaphone-with-blank-bubble-chat-copy-space-illustration-on-purple-banner-background-concept-of-join-us-job-vacancy-and-announcement-in-modern-flat-cartoon-style-design-vector.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
