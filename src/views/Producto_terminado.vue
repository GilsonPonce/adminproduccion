<template>
<tableShow nombreTabla="Producto terminado" pagina="producto_terminado" />
</template>

<script>
import tableShow from "@/components/tableShow.vue";
import { onUpdated,onMounted } from 'vue';
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
       setTimeout(()=>{
            store.state.producto_terminado = store.state.producto_terminado.detalle.filter((ob)=>ob.id_informe == route.params.id);
       },500);
    }
    filtroProductoTerminado();

    return{filtroProductoTerminado}
}
}
</script>

<style scoped>

</style>