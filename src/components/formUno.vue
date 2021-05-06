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
        let obje = {
          nombre: nombre.value,
          pagina: props.pagina
        };
        store.dispatch("postData", obje);
        store.dispatch("fetchData", props.pagina);
        setTimeout(() => {
          if (store.state.msm.status == 200) {
            nombre.value = "";
            store.commit("falseFormulario");
          } else {
            store.commit("falseFormulario");
            swal("Error en registros", "", "warning");
          }
        }, 500);
        //PUT
      } else if (nombre.value != "" && store.state.editar) {
        let obj={
          nombre: nombre.value,
          pagina: props.pagina
        }
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
          case "tipo_desperdicio":
            obj.id_tipo_desperdicio = store.state.objetoEditar.id_tipo_desperdicio;
            break;
        }
        store.dispatch("putData", obj);
        store.dispatch("fetchData", props.pagina);
        setTimeout(() => {
          if (store.state.msm.status == 200) {
            store.state.editar = false;
            store.state.objetoEditar = {};
            store.state.formulario = false;
            nombre.value = "";
          } else {
            swal(
              "Lo siento, se ha producido un error",
              "Ponte en contacto con el administrador",
              "warning"
            );
          }
        }, 300);
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
