<template>
<div v-if="activarFormulario">
    <div class="contenedor">
      <div class="modelo">
        <div>
          <formScrap />
        </div>
      </div>
    </div>
  </div>
<tableShow nombreTabla="Scrap" pagina="scrap" />
</template>

<script>
import tableShow from "@/components/tableShow.vue";
import formScrap from "../components/formScrap.vue";
import { onUpdated,onMounted,computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
name: "Scrap",
  components: {
    tableShow,
    formScrap
  },
setup(){

    const route = useRoute();
    const store = useStore();
 
    
    onMounted(async () => {
      await store.dispatch("fetchData", "scrap");
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", "scrap");
    });

    const inicioID = () => {
        store.state.id = route.params.id
    }
    inicioID();

    const activarFormulario = computed(() => {
      return store.state.formulario;
    });

    return{inicioID,activarFormulario}
}
}
</script>

<style scoped>
.contenedor {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.541);
}
.modelo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: auto 200px;
  position: relative;
  top: 18%;
}
</style>