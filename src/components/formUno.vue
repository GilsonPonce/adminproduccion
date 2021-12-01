<template>
  <div class="container">
    <div class="row marco justify-content-center">
      <div class="col-12">
        <label for="nombre" class="form-label">Nombre:</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="nombre"
          v-model="nombre"
          @keyup.enter="postData"
        />
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="postData"
            >
              Aplicar
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="falseFormulario"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.marco {
  border: 1px solid gray;
  padding: 20px;
  margin: 0px 0px;
}
.marco div {
  margin-top: 20px;
}
</style>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["pagina"],
  setup(props) {
    const store = useStore();

    const nombre = ref("");

    const falseFormulario = computed(() => {
      store.state.editar = false;
      store.state.objetoEditar = {};
      store.state.formulario = false;
      store.commit("falseFormulario");
    });

    const llenarDatosEditar = () => {
      if (store.state.editar) {
        nombre.value = store.state.objetoEditar.nombre;
      } else {
        nombre.value = "";
      }
    };
    llenarDatosEditar();

    const postData = computed(() => {
      //POST
      if (nombre.value != "" && !store.state.editar) {
        store.state.loading = true
        let obje = {
          nombre: nombre.value,
          pagina: props.pagina,
        };
        store.dispatch("postData", obje);
        nombre.value = "";
        store.commit("falseFormulario");

        if (store.state.msm?.status == 404) {
          swal(store.state.msm?.detalle, "", "warning");
        }

        //PUT
      } else if (nombre.value != "" && store.state.editar) {
        store.state.loading = true
        let obj = {
          nombre: nombre.value,
          pagina: props.pagina,
        };
        switch (props.pagina) {
          case "color":
            obj.id_color = store.state.objetoEditar.id_color;
            break;
          case "linea":
            obj.id_linea = store.state.objetoEditar.id_linea;
            break;
          case "material":
            obj.id_material = store.state.objetoEditar.id_material;
            break;
          case "tipo_material":
            obj.id_tipo_material = store.state.objetoEditar.id_tipo_material;
            break;
          case "tipo_scrap":
            obj.id_scrap = store.state.objetoEditar.id_tipo_scrap;
            break;
        }
        store.dispatch("putData", obj);
        //store.dispatch("fetchData", props.pagina);

        store.state.editar = false;
        store.state.objetoEditar = {};
        store.state.formulario = false;
        nombre.value = "";

        if (store.state.msm?.status == 404) {
          swal(store.state.msm?.detalle, "", "warning");
        }
      } else {
        swal(
          "Por favor, llena el campo",
          "Necesito el dato para poder registrarlo",
          "warning"
        );
      }
    });

    return { falseFormulario, llenarDatosEditar, postData, nombre };
  },
};
</script>
