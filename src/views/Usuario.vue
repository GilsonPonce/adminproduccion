<template>
 <div v-if="activarFormulario">
    <div class="contenedor">
      <div class="modelo">
        <div>
          <FormUsuario/>
        </div>
      </div>
    </div>
  </div>
    <TableShow nombreTabla="Usuarios del sistema" pagina="usuario" />  
</template>
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
<script>
import FormUsuario from "@/components/formUsuario";
import TableShow from "@/components/tableShow";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    name:  "Usuario",
    components:{
        FormUsuario,
        TableShow
    },
    setup() {
    const store = useStore();

    const activarFormulario = computed(() => {
      return store.state.formulario;
    });

    return { activarFormulario };
  },
}
</script>