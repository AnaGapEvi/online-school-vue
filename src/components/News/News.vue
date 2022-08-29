<template>
  <div class="news">
    <div>
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          {{ItemNews.title}}
        </b-card-text>

        <b-card-text>{{ItemNews.title}}</b-card-text>

        <router-link to="/edit-news" variant="success">Edit</router-link>
        <b-button variant="danger" @click="deleteNews(ItemNews.id)">Delete </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      ItemNews:{}
    }
  },
  methods:{
    deleteNews(id){
      this.axios.delete(`/delete-news/${id}`).then(response => {
        window.location.reload()
      }).catch(e =>{
        console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
