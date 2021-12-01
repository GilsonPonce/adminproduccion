<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <label for="nombre" class="form-label form-label-sm"
          >Kilogramos Diarios:</label
        >
        <input
          type="number"
          id="kilogramos_diarios"
          class="form-control form-control-sm"
          v-model="kilogramo_diario"
        />
      </div>
      <div class="col-4">
        <label for="nombre" class="form-label form-label-sm"
          >Kilogramos Hora:</label
        >
        <input
          type="number"
          id="kilogramos_horas"
          class="form-control form-control-sm"
          v-model="kilogramo_hora"
        />
      </div>
      <div class="col-4">
        <label for="nombre" class="form-label form-label-sm"
          >Tarifa Kilogramos Producidos:</label
        >
        <input
          type="number"
          id="tarifa_kilogramo_producidos"
          class="form-control form-control-sm"
          v-model="tarifa_kilogramo_producidos"
        />
      </div>
      <div class="col-4 mt-3">
        <label for="estado" class="form-label form-label-sm"
          >Estado del tarifario:</label
        >
        <select
          id="estado"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="estado"
        >
          <option v-bind:value="1">
            Habilitado
          </option>
          <option v-bind:value="0">
            Deshabilitado
          </option>
        </select>
      </div>
      <div class="col-4 mt-3">
        <label for="idLinea" class="form-label form-label-sm"
          >Linea a la que pertenece la tarifa:</label
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
      <div class="col-4 mt-3">
        <label for="idproceso" class="form-label form-label-sm"
          >Proceso a la que pertenece la tarifa:</label
        >
        <select
          id="idproceso"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_proceso"
          :disabled="id_linea == ''"
        >
          <option
            v-for="pro in procesos"
            v-bind:value="pro.id_proceso"
            v-bind:key="pro.id_proceso"
          >
            {{ pro.nombre }}
          </option>
        </select>
      </div>
      <div class="col-6 mt-3">
        <label for="idmaterial" class="form-label form-label-sm"
          >Material a la que pertenece la tarifa:</label
        >
        <select
          id="idmaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="material"
        >
          <option
            v-for="ma in materiales"
            v-bind:value="ma.nombre"
            v-bind:key="ma.id_material"
          >
            {{ ma.nombre }}
          </option>
        </select>
      </div>
      <div class="col-6 mt-3">
        <label for="idtipomaterial" class="form-label form-label-sm"
          >Tipo de Material a la que pertenece la tarifa:</label
        >
        <select
          id="idtipomaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="tipo_material"
        >
          <option
            v-for="tm in tipos_materiales"
            v-bind:value="tm.nombre"
            v-bind:key="tm.id_tipo_material"
          >
            {{ tm.nombre }}
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

    const kilogramo_diario = ref("");
    const kilogramo_hora = ref("");
    const tarifa_kilogramo_producidos = ref("");
    const estado = ref("");
    const id_linea = ref("");
    const id_proceso = ref("");
    const material = ref("");
    const tipo_material = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "linea");
      await store.dispatch("fetchData", "proceso");
      await store.dispatch("fetchData", "material");
      await store.dispatch("fetchData", "tipo_material");
    });

    const inicio = () => {
      if (store.state.editar) {
        if (
          store.state.objetoEditar != null ||
          store.state.objetoEditar != undefined ||
          store.state.objetoEditar != ""
        ) {
          kilogramo_diario.value = store.state.objetoEditar.kilogramo_diario;
          kilogramo_hora.value = store.state.objetoEditar.kilogramo_hora;
          tarifa_kilogramo_producidos.value =
            store.state.objetoEditar.tarifa_kilogramo_producidos;
          estado.value = store.state.objetoEditar.estado;
          id_linea.value = store.state.objetoEditar.id_linea;
          id_proceso.value = store.state.objetoEditar.id_proceso;
          material.value = store.state.objetoEditar.material;
          tipo_material.value = store.state.objetoEditar.tipo_material;
        } else {
          store.state.formulario = false;
        }
      } else {
        kilogramo_diario.value = "";
        kilogramo_hora.value = "";
        tarifa_kilogramo_producidos.value = "";
        estado.value = "";
        id_linea.value = "";
        id_proceso.value = "";
        material.value = "";
        tipo_material.value = "";
      }
    };
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
    };

    const enviar = () => {
      if (
        kilogramo_diario.value != "" &&
        kilogramo_hora.value != "" &&
        tarifa_kilogramo_producidos.value != "" &&
        (estado.value != "" || estado.value >= 0) &&
        id_linea.value != "" &&
        id_proceso.value != "" &&
        material.value != "" &&
        tipo_material.value != ""
      ) {
        //POST
        if (!store.state.editar) {
          let obj = {
            kilogramo_diario: kilogramo_diario.value,
            kilogramo_hora: kilogramo_hora.value,
            tarifa_kilogramo_producidos: tarifa_kilogramo_producidos.value,
            estado: estado.value,
            id_linea: id_linea.value,
            id_proceso: id_proceso.value,
            material: material.value,
            tipo_material: tipo_material.value,
            pagina: props.pagina,
          };
          store.dispatch("postData", obj);
          //store.dispatch("fetchData", props.pagina);

          store.state.formulario = false;
          kilogramo_diario.value = "";
          kilogramo_hora.value = "";
          tarifa_kilogramo_producidos.value = "";
          estado.value = "";
          id_linea.value = "";
          id_proceso.value = "";
          material.value = "";
          tipo_material.value = "";
          if (store.state.msm?.status == 404) {
            let mensaje = store.state.msm?.detalle;
            swal({
              title: mensaje,
              icon: "error",
            });
          }

          //PUT
        } else {
          let obj = {
            id_configuracion: store.state.objetoEditar.id_configuracion,
            kilogramo_diario: kilogramo_diario.value,
            kilogramo_hora: kilogramo_hora.value,
            tarifa_kilogramo_producidos: tarifa_kilogramo_producidos.value,
            estado: estado.value,
            id_linea: id_linea.value,
            id_proceso: id_proceso.value,
            material: material.value,
            tipo_material: tipo_material.value,
            pagina: props.pagina,
          };
          store.dispatch("putData", obj);
          //store.dispatch("fetchData", props.pagina);
          store.state.formulario = false;
          kilogramo_diario.value = "";
          kilogramo_hora.value = "";
          tarifa_kilogramo_producidos.value = "";
          estado.value = "";
          id_linea.value = "";
          id_proceso.value = "";
          material.value = "";
          tipo_material.value = "";

          if (store.state.msm?.status == 404) {
            swal({
              title: store.state.msm?.detalle,
              icon: "error",
            });
          }
        }
      } else {
        swal({
          title: "Se necesita los datos",
          text: "Llena los campos requeridos",
          icon: "warning",
        });
      }
    };

    const lineas = computed(() => {
      return store.state.linea.detalle;
    });
    const procesos = computed(() => {
      if (id_linea.value != "" && !store.state.editar) {
        return store.state.proceso.detalle.filter(
          (pro) => pro.id_linea == id_linea.value
        );
      }
    });
    const materiales = computed(() => {
      return store.state.material.detalle;
    });
    const tipos_materiales = computed(() => {
      return store.state.tipo_material.detalle;
    });

    return {
      cerrar,
      lineas,
      enviar,
      procesos,
      materiales,
      tipos_materiales,
      kilogramo_diario,
      kilogramo_hora,
      tarifa_kilogramo_producidos,
      estado,
      id_proceso,
      material,
      tipo_material,
      id_linea,
    };
  },
};
</script>

<style scoped></style>
