<template>
  <div class="container">
    <div class="row">
     
      <div class="col-12 mt-2">
        <label for="color" class="form-label form-label-sm">Color:</label>
        <select
          id="color"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_color"
        >
          <option
            v-for="co in colores"
            v-bind:value="co.id_color"
            v-bind:key="co.id_color"
          >
            {{ co.nombre }}
          </option>
        </select>
      </div>
      <div class="col-12 mt-2">
        <label for="peso" class="form-label form-label-sm">Peso:</label>
        <input
          type="numeric"
          id="peso"
          class="form-control form-control-sm"
          v-model="peso"
        />
      </div>
       <div class="col-12 mt-2">
        <label for="idlinea" class="form-label form-label-sm">Conformidad:</label>
        <select
          id="idlinea"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="tipo"
        >
          <option
         
            value="CONFORME"
          >
            SI
          </option>
          <option
         
            value="NO CONFORME"
          >
            NO
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col mt-3">
        <button class="btn btn-primary" @click="enviar">Aplicar</button>
        <button class="btn btn-danger ms-3" @click="cerrar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import swal from "sweetalert";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();

  
    const id_color = ref("");
    const peso = ref("");
    const tipo = ref("");
    const id_informe = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "color");
    });

    const inicio = () => {
      if (store.state.editar) {
        if (
          store.state.objetoEditar != null ||
          store.state.objetoEditar != undefined ||
          store.state.objetoEditar != ""
        ) {
          id_informe.value = store.state.objetoEditar.id_informe;
          peso.value = store.state.objetoEditar.peso;
          tipo.value = store.state.objetoEditar.tipo;
          id_color.value = store.state.objetoEditar.id_color;
        } else {
          store.state.formulario = false;
        }
      } else {
        id_informe.value = route.params.id;
        peso.value = "";
        id_color.value = "";
        tipo.value = "";
      }
    };
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
      store.state.editar = false;
      store.state.objetoEditar = {};
      id_informe.value = route.params.id;
      peso.value = "";
      id_color.value = "";
      tipo.value = "";
    };

    const enviar = () => {
      //POST
      if (
        id_informe.value != "" &&
        peso.value != "" &&
        tipo.value != "" &&
        id_color.value != ""
      ) {
        if (!store.state.editar) {

          let obj = {
            id_informe: id_informe.value,
            peso: peso.value,
            tipo: tipo.value,
            id_color: id_color.value,
            pagina: "producto_terminado",
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", "producto_terminado");
          setTimeout(() => {
            if (store.state.msm.status != 200) {
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              cerrar();
            }
          }, 500);

          //PUT
        } else {
          let obj = {
            id_producto_terminado: store.state.objetoEditar.id_producto_terminado,
            id_informe: id_informe.value,
            peso: peso.value,
            tipo: tipo.value,
            id_color: id_color.value,
            pagina: "producto_terminado",
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", "producto_terminado");
          setTimeout(() => {
            if (store.state.msm.status != "200") {
              store.state.formulario = false;
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              cerrar();
            }
          }, 500);
        }
      } else {
        swal({
          title: "Necesito los datos",
          text: "Llena los campos requeridos",
          icon: "warning",
        });
      }
    };

    const colores = computed(() => {
      return store.state.color.detalle;
    });

    const editar = computed(() => {
      return store.state.editar;
    });

    return {
      cerrar,
      editar,
      enviar,
      colores,
      id_color,
      id_informe,
      peso,
      tipo,
    
    };
  },
};
</script>

<style scoped></style>
