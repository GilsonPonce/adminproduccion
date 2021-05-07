<template>
<tableShow nombreTabla="Registros del personal" pagina="registro" />
</template>

<script>
import tableShow from "@/components/tableShow.vue";
import { onUpdated,onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
name: "Registro",
  components: {
    tableShow
  },
setup(){

    const route = useRoute();
    const store = useStore();
 
    
    onMounted(async () => {
      await store.dispatch("fetchData", "registro");
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", "registro");
    });

    const inicioID = () => {
        store.state.id = route.params.id
    }
    inicioID();

    return{inicioID}
}
}
</script>

<style scoped>

</style>