<template>
  <div>
    <div>
      <b-navbar-nav style="color: black; background-color: white; height: 680px; display: flex; flex-direction: column;">
        <b-navbar-brand href="#" class="left" style="color: deepskyblue;padding: 8px"><h3>APPS</h3></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav style="padding-top: 50px; ">
          <b-nav-item style="color:black;" disabled>
            <b-icon style="margin-right: 15px" icon="house" scale="1" variant="Secondary"></b-icon>
            Dashboard
          </b-nav-item>
        </b-navbar-nav>
        <!--/*        <hr style="color: white">*/-->
        <b-navbar-nav  style="padding: 8px" toggleable  class="ml-auto ">
          <b-nav-item>
            <b-icon style="margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>
            <b-nav-item-dropdown text="News" right>
              <b-dropdown-item><router-link to="/all-news">News </router-link> </b-dropdown-item>
              <b-dropdown-item><router-link to="/create-news">Create news</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav  style="padding: 8px" toggleable  class="ml-auto ">
          <b-nav-item >
            <b-icon  style="display: inline-block; margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>
            <b-nav-item-dropdown text="Announcement" right>
              <b-dropdown-item ><router-link to="/new-announcement">New Announcements </router-link> </b-dropdown-item>
              <b-dropdown-item><router-link to="/all-announcement">Announcement</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav style="padding:8px">
          <b-icon icon="person" scale="1" style="color: black; margin-right: 8px"></b-icon>
          <b-nav-item-dropdown text="Uploaded Assignment" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav style="padding:8px">
          <b-nav-item>
            <b-icon style="margin-right: 15px" icon="files" scale="1" variant="Secondary"></b-icon>

            Subject Wise Report
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav style="padding:8px">
          <b-nav-item>
            <b-icon icon="person" scale="1" style="color: black; margin-right: 8px"></b-icon>Reports
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav style="padding:8px">
          <b-nav-item>
            <b-icon icon="person" scale="1" style="color: black; margin-right: 8px"></b-icon>Reg Users
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email:'',
      role:''
    }
  },
  mounted() {
    this.getMy()
  },
  methods: {
    getMy() {
      return new Promise((resolve, reject) => {
        this.axios.get('/me')
          .then(result => {
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
</script>

<style scoped>

</style>

