<template>
<tableShow nombreTabla="Materia Prima" pagina="materia_prima" />
</template>

<script>
import tableShow from "@/components/tableShow.vue";
import { onUpdated,onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
name: "MateriaPrima",
  components: {
    tableShow
  },
setup(){

    const route = useRoute();
    const store = useStore();
 
    
    onMounted(async () => {
      await store.dispatch("fetchData", "materia_prima");
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", "materia_prima");
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