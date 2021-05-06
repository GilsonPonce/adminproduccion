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
        />
      </div>
      <div class="col-12">
        <label for="apellido" class="form-label">Apellido:</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="apellido"
          v-model="apellido"
        />
      </div>
      <div class="col-12">
        <label for="cedula" class="form-label">Cedula:</label>
        <input
          type="number"
          class="form-control form-control-sm"
          id="cedula"
          v-model="cedula"
          @keyup="generarCodigo"
          :disabled="editarFor"
        />
      </div>
      <div class="col-12">
        <label for="codigo" class="form-label">Codigo:</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="codigo"
          v-model="id_personal"
          :disabled = "editarFor"
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
    const apellido = ref("");
    const cedula = ref("");
    const id_personal = ref("");

    const falseFormulario = computed(() => {
      store.state.editar = false;
      store.state.objetoEditar = {};
      store.state.formulario = false;
      store.commit("falseFormulario");
    });

    const inicio = () => {
      if (store.state.editar) {
        nombre.value = store.state.objetoEditar.nombre;
        apellido.value = store.state.objetoEditar.apellido;
        cedula.value = store.state.objetoEditar.cedula;
        id_personal.value = store.state.objetoEditar.id_personal;
      } else {
        nombre.value = "";
        apellido.value = "";
        cedula.value = "";
        id_personal.value = "";
      }
    };
    inicio();

    const postData = computed(() => {
      //POST
      if (nombre.value != "" && !store.state.editar) {
        let obje = {
          id_personal: id_personal.value,
          apellido: apellido.value,
          cedula: cedula.value,
          nombre: nombre.value,
          pagina: props.pagina,
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
      } else if (store.state.editar) {
        let obj = {
          id_personal: store.state.objetoEditar.id_personal,
          apellido: apellido.value,
          cedula: cedula.value,
          nombre: nombre.value,
          pagina: props.pagina,
        };
        store.dispatch("putData", obj);
        store.dispatch("fetchData", props.pagina);
        setTimeout(() => {
          if (store.state.msm.status == 200) {
            store.state.editar = false;
            store.state.objetoEditar = {};
            store.state.formulario = false;
            nombre.value = "";
            apellido.value = "";
            cedula.value = "";
            id_personal.value = "";
          } else {
            swal(
              "Lo siento, se ha producido un error",
              "Ponte en contacto con el administrador",
              "error"
            );
          }
        }, 500);
      } else {
        swal(
          "Por favor, llena el campo",
          "Necesito el dato para poder registrarlo",
          "warning"
        );
      }
    });

    const generarCodigo = ()=>{
        return id_personal.value =  cedula.value.substring(cedula.value.length - 4)
    };

    const editarFor = computed(()=>{
        return store.state.editar
    });

    return {
      falseFormulario,
      inicio,
      postData,
      generarCodigo,
      editarFor,
      nombre,
      apellido,
      cedula,
      id_personal,
    };
  },
};
</script>
