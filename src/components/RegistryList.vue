<template>
  <div class="text-center">
    <v-overlay :value="loading">
      <div> Loading repositories</div>
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <div id="card-containers">
      <RegistryItem v-for="repo in repos" :key="repo" :name="repo"/>
    </div>
  </div>
</template>

<script>

import RegistryItem from "@/components/RegistryItem";
import {config} from "@/config";
export default {
  name: "RegistryList",
  components: {RegistryItem},
  data() {
    return {
      loading: true,
      repos: []
    }
  },
  methods: {
    fetchRepositories: async function () {
      const token = window.sessionStorage.getItem('Authorization')
      const resp = await fetch(`${config.apiUrl}/v2/_catalog`, {
        headers: {'Authorization': token}
      })

      if (resp.ok) {
        const {repositories} = await resp.json();
        this.repos = repositories;
      }
    }
  },
  mounted() {
    this.loading = true;
    this.fetchRepositories();
    this.loading = false;
  }
}
</script>

<style scoped>
#card-containers {
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  margin-top: 20px;
}
</style>