<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
      />

      <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
      />
    </div>
    <v-spacer></v-spacer>
    <div id="nav">
      <v-btn class="ma-2" outlined @click="logout">
        Logout
      </v-btn>
    </div>
  </v-app-bar>

</template>

<script>
export default {
  name: "MenuHeader",
  methods: {
    logout: function () {
      window.sessionStorage.clear();
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>

</style>