<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-2">
        <label for="idPersonal" class="form-label form-label-sm"
          >Personal:</label
        >
        <select
          id="idPersonal"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_personal"
        >
          <option
            v-for="per in personal"
            v-bind:value="per.id_personal"
            v-bind:key="per.id_personal"
          >
            {{ per.nombre + " " + per.apellido }}
          </option>
        </select>
      </div>
      <div class="col-12 mt-3" :hidden="!editar">
        <label for="fechahorainicio" class="form-label form-label-sm"
          >Fecha De Inicio:</label
        >
        <input
          type="datetime-local"
          min="2018-06-07T00:00"
          max="2025-06-14T00:00"
          id="fechahorainicio"
          class="form-control form-control-sm"
          v-model="fecha_hora_inicio"
        />
      </div>
      <div class="col-12 mt-3" :hidden="!editar">
        <label for="fechahorafin" class="form-label form-label-sm"
          >Fecha Final:</label
        >
        <input
          type="datetime-local"
          min="2018-06-07T00:00"
          max="2025-06-14T00:00"
          id="fechahorafin"
          class="form-control form-control-sm"
          v-model="fecha_hora_fin"
        />
      </div>
      <div class="col-4 mt-3" :hidden="!editar">
        <label for="activo" class="form-label form-label-sm">Activo?:</label>
        <select
          id="activo"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="activo"
        >
          <option value="1">Si</option>
          <option value="0">No</option>
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
  props: ["pagina"],
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const fecha_hora_inicio = ref("");
    const fecha_hora_fin = ref("");
    const id_personal = ref("");
    const id_informe = ref("");
    const activo = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "personal");
    });

    const inicio = () => {
      if (store.state.editar) {
        if (
          store.state.objetoEditar != null ||
          store.state.objetoEditar != undefined ||
          store.state.objetoEditar != ""
        ) {
          fecha_hora_inicio.value = store.state.objetoEditar.fecha_hora_inicio.replace(
            " ",
            "T"
          );
          id_personal.value = store.state.objetoEditar.id_personal;
          fecha_hora_fin.value = store.state.objetoEditar.fecha_hora_fin.replace(
            " ",
            "T"
          );
          id_informe.value = store.state.objetoEditar.id_informe;
          activo.value = store.state.objetoEditar.activo;
        } else {
          store.state.formulario = false;
        }
      } else {
        activo.value = "";
        id_informe.value = route.params.id;
        id_personal.value = "";
        fecha_hora_fin.value = "";
        fecha_hora_inicio.value = "";
      }
    };
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
      store.state.editar = false;
      store.state.objetoEditar = {};
      activo.value = "";
      id_informe.value = route.params.id;
      id_personal.value = "";
      fecha_hora_fin.value = "";
      fecha_hora_inicio.value = "";
    };

    const enviar = () => {
      //POST
      if (!store.state.editar) {
        if (id_personal.value != "" && id_informe.value != "") {
          let obj = {
            id_personal: id_personal.value,
            id_informe: id_informe.value,
            pagina: "registro",
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", "registro");
          setTimeout(() => {
            if (store.state.msm.status != 200) {
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              store.state.formulario = false;
              activo.value = "";
              id_informe.value = route.params.id;
              id_personal.value = "";
              fecha_hora_fin.value = "";
              fecha_hora_inicio.value = "";
            }
          }, 500);
        } else {
          swal({
            title: "Nesecito los datos",
            text: "Llena los campos requeridos",
            icon: "warning",
          });
        }
        //PUT
      } else {
        if (
          fecha_hora_inicio.value != "" &&
          fecha_hora_fin.value != "" &&
          id_personal.value != "" &&
          id_informe.value != "" &&
          activo.value != ""
        ) {
          let obj = {
            id_registro: store.state.objetoEditar.id_registro,
            id_informe: id_informe.value,
            id_personal: id_personal.value,
            fecha_hora_fin: fecha_hora_fin.value.replace("T", " "),
            fecha_hora_inicio: fecha_hora_inicio.value.replace("T", " "),
            activo: activo.value,
            pagina: "registro",
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", "registro");
          setTimeout(() => {
            console.log(store.state.msm.status);
            if (store.state.msm.status != "200") {
              store.state.formulario = false;
              swal({
                title: "Lo siento, hubo un error",
                icon: "error",
              });
            } else {
              store.state.formulario = false;
              store.state.editar = false;
              store.state.objetoEditar = {};
              activo.value = "";
              id_informe.value = route.params.id;
              id_personal.value = "";
              fecha_hora_fin.value = "";
              fecha_hora_inicio.value = "";
            }
          }, 500);
        } else {
          swal({
            title: "Nesecito los datos",
            text: "Llena los campos requeridos",
            icon: "warning",
          });
        }
      }
    };

    const personal = computed(() => {
      return store.state.personal.detalle;
    });

    const editar = computed(() => {
      return store.state.editar;
    });

    return {
      cerrar,
      editar,
      personal,
      enviar,
      id_personal,
      id_informe,
      fecha_hora_inicio,
      fecha_hora_fin,
      activo,
    };
  },
};
</script>

<style scoped></style>
