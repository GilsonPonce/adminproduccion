<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <label for="nombre" class="form-label form-label-sm">Nombre</label>
        <input
          type="text"
          id="nombre"
          class="form-control form-control-sm"
          v-model="nombre"
        />
      </div>
      <div class="col-12 mt-2">
        <label for="idLinea" class="form-label form-label-sm"
          >Linea a la que pertenece el proceso:</label
        >
        <select
          id="idLinea"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_linea"
        >
          <option
            v-for="li in lineas"
            v-bind:value="li.id_linea"
            v-bind:key="li.id_linea"
          >
            {{ li.nombre }}
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
export default {
  props: ["pagina"],
  setup(props) {
    const store = useStore();
    const nombre = ref("");
    const id_linea = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "linea");
    });

    const inicio = () => {
      if(store.state.editar){
        if(store.state.objetoEditar != null || store.state.objetoEditar != undefined || store.state.objetoEditar != ""){
          nombre.value = store.state.objetoEditar.nombre;
          id_linea.value = store.state.objetoEditar.id_linea;
        }else{
          store.state.formulario = false;
        }
      }else{
        nombre.value = "";
        id_linea.value = "";
      }
    }
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
    };

    const enviar = () => {
      if (nombre.value != "" && id_linea.value != "") {
        //POST
        if (!store.state.editar) {
          let obj = {
            nombre: nombre.value,
            id_linea: id_linea.value,
            pagina: props.pagina,
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", props.pagina);
          setTimeout(() => {
            if (store.state.msm.status != 200) {
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              store.state.formulario = false;
              nombre.value = "";
              id_linea = "";
            }
          }, 300);
          //PUT
        } else {
          let obj = {
            id_proceso: store.state.objetoEditar.id_proceso,
            nombre: nombre.value,
            id_linea: id_linea.value,
            pagina: props.pagina
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", props.pagina);
          setTimeout(() => {
            if (store.state.msm.status != 200) {
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              store.state.formulario = false;
              nombre.value = "";
              id_linea = "";
            }
          }, 300);
        }
      } else {
        swal({
          title: "Nesecito los datos",
          text: "Llena los campos requeridos",
          icon: "warning",
        });
      }
    };

    const lineas = computed(() => {
      return store.state.linea.detalle;
    });

    return { cerrar, lineas, enviar, nombre, id_linea };
  },
};
</script>

<style scoped></style>
