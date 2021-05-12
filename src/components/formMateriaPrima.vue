<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-2">
        <label for="idlinea" class="form-label form-label-sm">Linea:</label>
        <select
          id="idlinea"
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
      <div class="col-6 mt-2">
        <label for="idproceso" class="form-label form-label-sm">Proceso:</label>
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
      <div class="col-6 mt-2">
        <label for="idmaterial" class="form-label form-label-sm"
          >Material:</label
        >
        <select
          id="idmaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_material"
        >
          <option
            v-for="mate in materiales"
            v-bind:value="mate.id_material"
            v-bind:key="mate.id_material"
          >
            {{ mate.nombre }}
          </option>
        </select>
      </div>
      <div class="col-6 mt-2">
        <label for="idtipomaterial" class="form-label form-label-sm"
          >Tipo Material:</label
        >
        <select
          id="idtipomaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_tipo_material"
        >
          <option
            v-for="tipoma in tipos_materiales"
            v-bind:value="tipoma.id_tipo_material"
            v-bind:key="tipoma.id_tipo_material"
          >
            {{ tipoma.nombre }}
          </option>
        </select>
      </div>
      <div class="col-6 mt-2">
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
      <div class="col-6 mt-2">
        <label for="peso" class="form-label form-label-sm">Peso:</label>
        <input
          type="numeric"
          id="peso"
          class="form-control form-control-sm"
          v-model="peso"
        />
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

    const id_linea = ref("");
    const id_proceso = ref("");
    const id_tipo_material = ref("");
    const id_material = ref("");
    const id_color = ref("");
    const id_configuracion = ref("");
    const peso = ref("");
    const id_informe = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "linea");
      await store.dispatch("fetchData", "proceso");
      await store.dispatch("fetchData", "tipo_material");
      await store.dispatch("fetchData", "material");
      await store.dispatch("fetchData", "configuracion");
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
          id_configuracion.value = store.state.objetoEditar.id_configuracion;
          id_color.value = store.state.objetoEditar.id_color;
          id_material.value = store.state.objetoEditar.id_material;
          id_tipo_material.value = store.state.objetoEditar.id_tipo_material;
          id_proceso.value = store.state.objetoEditar.id_proceso;
          id_linea.value = store.state.objetoEditar.id_linea;
        } else {
          store.state.formulario = false;
        }
      } else {
        id_informe.value = route.params.id;
        peso.value = "";
        id_linea.value = "";
        id_proceso.value = "";
        id_tipo_material.value = "";
        id_material.value = "";
        id_color.value = "";
        id_configuracion.value = "";
      }
    };
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
      store.state.editar = false;
      store.state.objetoEditar = {};
      id_informe.value = route.params.id;
      peso.value = "";
      id_linea.value = "";
      id_proceso.value = "";
      id_tipo_material.value = "";
      id_material.value = "";
      id_color.value = "";
      id_configuracion.value = "";
    };

    const idConfiguracion = () => {
        let objetoConfiguracion = store.state.configuracion.detalle.find((obj)=>{
          if(
              obj.id_linea == id_linea.value &&
              obj.id_proceso == id_proceso.value &&
              obj.id_material == id_material.value &&
              obj.id_tipo_material == id_tipo_material.value &&
              obj.estado > 0
          ){
              return obj
          }
      });
      id_configuracion.value = objetoConfiguracion.id_configuracion
    }

    const enviar = () => {
        idConfiguracion();
      //POST
      if (
        id_informe.value != "" &&
        peso.value != "" &&
        id_configuracion.value != "" &&
        id_color.value != ""
      ) {
        if (!store.state.editar) {

          let obj = {
            id_informe: id_informe.value,
            peso: peso.value,
            id_configuracion: id_configuracion.value,
            id_color: id_color.value,
            pagina: "materia_prima",
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", "materia_prima");
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
            id_materia_prima: store.state.objetoEditar.id_materia_prima,
            id_informe: id_informe.value,
            peso: peso.value,
            id_configuracion: id_configuracion.value,
            id_color: id_color.value,
            pagina: "materia_prima",
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", "materia_prima");
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

    const lineas = computed(() => {
      return store.state.linea.detalle;
    });

    const procesos = computed(() => {
     return id_linea.value != "" && store.state.configuracion.status == 200 ? store.state.proceso.detalle.filter((obj)=>obj.id_linea == id_linea.value) : "";
    });

    const materiales = computed(() => {
      return store.state.material.detalle;
    });

    const tipos_materiales = computed(() => {
      return store.state.tipo_material.detalle;
    });

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
      lineas,
      procesos,
      tipos_materiales,
      materiales,
      colores,
      id_linea,
      id_proceso,
      id_material,
      id_tipo_material,
      id_color,
      id_configuracion,
      id_informe,
      peso,
      idConfiguracion,
    };
  },
};
</script>

<style scoped></style>
