<template>
  <v-card max-width="344" elevation="2" outlined class="card">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-actions>
      <v-spacer/>
      <v-chip v-for="tag in tags" :key="`${name}-${tag}`" v-on:click="()=>openDetails(tag)">
        {{ tag }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
import {config} from "@/config";

export default {
  name: "RegistryItem",
  props: {
    name: String
  },
  data: () => ({
    tags: [],
  }),
  methods: {
    fetchTags: async function () {
      const token = window.sessionStorage.getItem('Authorization')
      const resp = await fetch(`${config.apiUrl}/v2/${this.name}/tags/list`, {
        headers: {'Authorization': token}
      })

      if (resp.ok) {
        const {tags} = await resp.json();
        this.tags = tags
      }
    },
    openDetails: function (tag) {
      this.$router.push({
        name: 'Detail',
        params: {
          repo: this.name,
          tag
        }
      })
    }
  },
  mounted() {
    this.fetchTags();
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>