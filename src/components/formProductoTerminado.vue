<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-2">
        <label for="idmaterial" class="form-label form-label-sm"
          >Material:</label
        >
        <select
          id="idmaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="material"
        >
          <option
            v-for="(mate, index) in materiales"
            v-bind:value="mate"
            v-bind:key="index"
          >
            {{ mate }}
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
          v-model="tipo_material"
          :disabled="material == ''"
        >
          <option
            v-for="(tipoma, index) in tipos_materiales"
            v-bind:value="tipoma"
            v-bind:key="index"
          >
            {{ tipoma }}
          </option>
        </select>
      </div>

      <div class="col-12 mt-2">
        <label for="color" class="form-label form-label-sm">Color:</label>
        <select
          id="color"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="color"
        >
          <option
            v-for="co in colores"
            v-bind:value="co.nombre"
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
        <label for="idlinea" class="form-label form-label-sm"
          >Conformidad:</label
        >
        <select
          id="idlinea"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="tipo"
        >
          <option value="CONFORME">
            SI
          </option>
          <option value="NO CONFORME">
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

    const color = ref("");
    const peso = ref("");
    const tipo = ref("");
    const id_informe = ref("");
    const material = ref("");
    const tipo_material = ref("");
    const id_proceso = ref("");
    const id_linea = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "color");
      await store.dispatch("fetchData", "configuracion");
    });

    const GetInfoInforme = () => {
      let info = store.state.informe?.detalle.filter((infor) => {
        if (infor.id_informe == route.params.id) {
          return infor;
        }
      });
      id_proceso.value = info[0].id_proceso;
      id_linea.value = info[0].id_linea;
    };

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
          color.value = store.state.objetoEditar.color;
          material.value = store.state.objetoEditar.material;
          tipo_material.value = store.state.objetoEditar.tipo_material;
          id_linea.value = store.state.objetoEditar.id_linea;
          id_proceso.value = store.state.objetoEditar.id_proceso;
        } else {
          store.state.formulario = false;
        }
      } else {
        GetInfoInforme();
        id_informe.value = route.params.id;
        material.value = "";
        tipo_material.value = "";
        peso.value = "";
        color.value = "";
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
      color.value = "";
      tipo.value = "";
    };

    const enviar = () => {
      //POST
      if (
        id_informe.value != "" &&
        peso.value != "" &&
        tipo.value != "" &&
        color.value != "" &&
        id_linea.value != "" &&
        id_proceso.value != ""
      ) {
        if (!store.state.editar) {
          store.state.loading = true;
          let obj = {
            id_informe: id_informe.value,
            peso: peso.value,
            tipo: tipo.value,
            color: color.value,
            id_proceso: id_proceso.value,
            tipo_material: tipo_material.value,
            material: material.value,
            pagina: "producto_terminado",
          };
          store.dispatch("postData", obj);
          //store.dispatch("fetchData", "producto_terminado");
          cerrar();
          if (store.state.msm?.status == 404) {
            swal({
              title: store.state.msm?.detalle,
              icon: "error",
            });
          }

          //PUT
        } else {
          store.state.loading = true;
          let obj = {
            id_producto_terminado:
              store.state.objetoEditar.id_producto_terminado,
            id_informe: id_informe.value,
            peso: peso.value,
            tipo: tipo.value,
            id_proceso: id_proceso.value,
            tipo_material: tipo_material.value,
            material: material.value,
            color: color.value,
            pagina: "producto_terminado",
          };
          store.dispatch("putData", obj);
          //store.dispatch("fetchData", "producto_terminado");
          cerrar();
          if (store.state.msm?.status == 404) {
            store.state.formulario = false;
            swal({
              title: store.state.msm?.detalle,
              icon: "error",
            });
          }
        }
      } else {
        swal({
          title: "Se necesitan los datos",
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

    const materiales = computed(() => {
      if (id_linea.value?.length != 0 && id_proceso.value?.length != 0) {
        let filtroByProcesoAndLinea = store.state.configuracion.detalle?.filter(
          (valor) => {
            let vali1 = valor.id_linea === id_linea.value;
            let vali2 = valor.id_proceso === id_proceso.value;
            if (vali1 && vali2) {
              return valor;
            }
          }
        );
        let arrayNombreMaterialesDisponibles = filtroByProcesoAndLinea?.map(
          (confi) => {
            return confi.material;
          }
        );

        return Array.from(new Set(arrayNombreMaterialesDisponibles));
      } else {
        return [];
      }
    });

    const tipos_materiales = computed(() => {
      if (
        id_linea.value?.length != 0 &&
        id_proceso.value?.length != 0 &&
        material.value.length != 0
      ) {
        let filtroByProcesoAndLineaAndMaterial = store.state.configuracion.detalle?.filter(
          (valor) => {
            let vali1 = valor.id_linea === id_linea.value;
            let vali2 = valor.id_proceso === id_proceso.value;
            let vali3 = valor.material === material.value;
            if (vali1 && vali2 && vali3) {
              return valor;
            }
          }
        );
        let arrayNombreTipoMaterialesDisponibles = filtroByProcesoAndLineaAndMaterial?.map(
          (confi) => {
            return confi.tipo_material;
          }
        );
        return Array.from(new Set(arrayNombreTipoMaterialesDisponibles));
      } else {
        return [];
      }
    });

    return {
      GetInfoInforme,
      materiales,
      tipos_materiales,
      cerrar,
      editar,
      enviar,
      colores,
      color,
      id_informe,
      id_proceso,
      id_linea,
      peso,
      tipo,
      material,
      tipo_material,
    };
  },
};
</script>

<style scoped></style>
