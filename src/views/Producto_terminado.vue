<template>
<tableShow nombreTabla="Producto terminado" pagina="producto_terminado" />
</template>

<script>
import tableShow from "@/components/tableShow.vue";
import { onUpdated,onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
name: "ProductoTerminado",
  components: {
    tableShow
  },
setup(){

    const route = useRoute();
    const store = useStore();
 
    
    onMounted(async () => {
      await store.dispatch("fetchData", "producto_terminado");
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", "producto_terminado");
    });

    const filtroProductoTerminado = () => {
        store.state.id = route.params.id
    }
    filtroProductoTerminado();

    return{filtroProductoTerminado}
}
}
</script>

<style scoped>

</style>