<template>
  <div v-if="activarFormulario">
    <div class="contenedor">
      <div class="modelo">
          <div>
              <FormUno pagina="color" />
          </div>
      </div>
    </div>
  </div>
  <tableShow nombreTabla="Configuracion" pagina="color" />
</template>
<script>
import tableShow from "@/components/tableShow.vue";
import FormUno from "../components/formUno.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";


export default {
  name: "Color",
  components: {
    FormUno,
    tableShow,
  },
  setup() {

    const store = useStore();
    
    const activarFormulario = computed(()=>{
        return store.state.formulario
    });

    return { activarFormulario };
  },
};
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
  margin: auto 400px;
  position: relative;
  top: 18%;
}
</style>
