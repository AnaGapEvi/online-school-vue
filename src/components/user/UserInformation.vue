<template>
  <div class="subjects">
    <dashboard-nav style="position: fixed;z-index: 1; width: 100%"/>
    <div style="display: flex; justify-content: space-between; padding-top: 80px">
      <aside-navbar style="box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 1);width: 18%; background-color: white; margin-right: 15px"/>
      <div  style=" box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 1); border-radius: 5px; width: 100%; background-color: #324960; padding: 15px ">
        <div style="display: flex; justify-content: center">
          <div>
            <div style="width: 100%; display: flex; justify-content: space-between">
              <h5 style="color: white">{{user.role}}</h5>
              <button v-if="role==='student'" style="border: none; color: white; background-color: #324960" @click.prevent="back()">X</button>
            </div>

            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body >
                    <b-card-text> Email:
                      {{ user.email }}
                    </b-card-text>
                    <b-card-text> Name:
                      {{ user.name }}
                    </b-card-text>
                    <b-card-text> Mobile:
                      +001{{ user.mobile }}
                    </b-card-text>
                    <b-card-text v-if="user.role_number !== ''"> Role number:
                      {{ user.role_number }}
                    </b-card-text>
                    <b-card-text v-for="course in user.courses" :key="course.id"> Course:
                      {{ coursei.name }}
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
               <router-link style="text-decoration: none; color: white" :to="{path: '/update-profile/'+user.id}"><b-button style="width: 100%" variant="danger">Edit</b-button></router-link>
            </b-card>
          </div>
         </div>
      </div>
    </div>
    <footer> <p>This dashboard was generated on OCAS </p></footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user:[],
      role:'',
    }
  },
  mounted() {
    this.getMy()
    this.log()
  },

  methods: {
    back(){
      window.history.go(-1)
    },
    log(){
      if(this.role==='student'){
        this.axios.post('log', {pageName:'User Information'}).then(resp => {
          return resp
        }).catch(e =>{
          return e
        })
      }
    },
    getMy() {
      this.axios.get('/me-data').then(res => {
        this.user = res.data[0]
        this.role=this.user.role
        console.log(res.data[0])
        // this.role=res.data.user.role
      }).catch(error => {
        return error
      })
    },
  }
}
</script>

<style scoped>
.subjects{
  min-height: 100vh;
  background-color: #324960;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: black;
  text-align: center;
}
</style>
