<template>
  <v-app>
    <MenuHeader/>
    <v-main>
      <v-breadcrumbs :items="items" divider="-"/>
      <v-divider></v-divider>
      <RegistryList/>
    </v-main>
  </v-app>

</template>

<script>
import MenuHeader from "@/components/MenuHeader";
import RegistryList from "@/components/RegistryList";

export default {
  name: 'Home',
  components: {RegistryList, MenuHeader},
  data: () => ({
    items: [
      {
        text: 'Repositories',
        disabled: false,
        href: '/',
      },
    ],
  }),
}
</script>
<style>
#nav a {
  color: white;
}

</style>
