<template>
  <v-app>
    <MenuHeader/>
    <v-main>
      <v-breadcrumbs :items="items" divider="-"/>
      <v-divider></v-divider>
      <div>
        <v-btn class="mx-5 mt-3 mb-10" fab @click="goBack">
          <v-icon >
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </div>
      TODO: <br>
      - Add backend to a description<br>
      - Design<br>
      <br>
      <div v-if="manifest">
        <div>
          tag: {{ manifest.tag }}
        </div>
        <div>
          architecture: {{ manifest.architecture }}
        </div>
        <div>
          schemaVersion: {{ manifest.schemaVersion }}
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MenuHeader from "@/components/MenuHeader";
import {config} from "@/config";

export default {
  name: "Detail",
  components: {MenuHeader},
  data: function () {
    return {
      items: [
        {
          text: 'Repositories',
          disabled: false,
          href: '/',
        },
        {
          text: this.$router.currentRoute.params.repo,
          disabled: false,
          href: this.$router.currentRoute.params.repo,
        },
      ],
      manifest: null
    }
  },
  methods: {
    fetchManifest: async function () {
      const {repo, tag} = this.$router.currentRoute.params;
      const token = window.sessionStorage.getItem('Authorization')
      const resp = await fetch(`${config.apiUrl}/v2/${repo}/manifests/${tag}`, {
        headers: {'Authorization': token}
      })

      if (resp.ok) {
        this.manifest = await resp.json();
      }
    },
    goBack: function(){
      this.$router.go(-1);
    }
  },
  mounted() {
    this.fetchManifest();
  }
}
</script>

<style scoped>

</style>