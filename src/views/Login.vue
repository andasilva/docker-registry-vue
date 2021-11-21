<template>
  <v-app>
    <div id="page">
      <div id="form-container">
        <h2 id="form-title">Login</h2>
        <div id="form">
          <v-text-field label="username" v-model="username"/>
          <v-text-field type="password" label="mot de passe" v-model="password"/>
          <v-btn @click="login">login</v-btn>
          <v-alert
              id="form-error"
              v-if="wrongCredentials"
              dismissible
              type="error">
            Wrong credentials
          </v-alert>
          <v-snackbar
              :value="loginSuccess"
              absolute
              bottom
              color="green"
              elevation="24">
            Connected! Redirection in progress
          </v-snackbar>
        </div>
      </div>
      <div id="background"/>
    </div>
  </v-app>
</template>

<script>
import {config} from "@/config";

export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    wrongCredentials: false,
    loginSuccess: false
  }),
  methods: {
    login: async function () {
      this.wrongCredentials = false;
      const token = 'Basic ' + btoa(this.username + ':' + this.password);
      const resp = await fetch(`${config.apiUrl}/v2/`,
          {
            headers: {
              'Authorization': token
            }
          })

      if (resp.ok) {
        this.handleLoginSuccess(token)
      } else {
        this.wrongCredentials = true;
      }
    },
    handleLoginSuccess: function (token) {
      this.loginSuccess = true;
      this.saveAuthToken(token)
      this.redirectAfterLogin()
    },
    saveAuthToken: function (token) {
      window.sessionStorage.setItem('Authorization', token)
    },
    redirectAfterLogin: function () {
      this.$router.push({name: 'Home'});
    }
  },
}
</script>

<style scoped>
#page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
}

#form-title {
  margin-bottom: 20px;
}

#form {
  width: 300px;
}

#form-error {
  margin-top: 32px;
}

#background {
  flex: 1;
  background: var(--primary-color) url('~@/assets/docker_hub.png') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}


@media (min-width: 768px) {
  #page {
    flex-direction: row;
  }

  #form-container {
    padding: 100px;
    min-height: 70vh;
    justify-content: center;
  }
}

</style>