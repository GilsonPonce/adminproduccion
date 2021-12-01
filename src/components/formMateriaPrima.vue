<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-2">
        <label for="idproceso" class="form-label form-label-sm">Proceso:</label>
        <select
          id="idproceso"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_proceso"
          :disabled="id_linea == ''"
          @change="cambioProceso"
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
          id="idselectmaterial"
          ref="selectMaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="material"
          :disabled = "bloqueomaterial"
        >
          <option
            v-for="(mate,index) in materiales"
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
          id="idselecttipomaterial"
          ref="selectMaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="tipo_material"
          :disabled="material==''"
        >
          <option
            v-for="(tipoma,index) in tipos_materiales"
            v-bind:value="tipoma"
            v-bind:key="index"
          >
            {{ tipoma }}
          </option>
        </select>
      </div>
      <div class="col-6 mt-2">
        <label for="color" class="form-label form-label-sm">Color:</label>
        <select
          id="selectcolor"
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
    const tipo_material = ref("");
    const material = ref("");
    const color = ref("");
    const id_configuracion = ref("");
    const peso = ref("");
    const id_informe = ref("");
    const selectMaterial = ref(null)

    onMounted(async () => {
      store.state.loading = true;
      await store.dispatch("fetchData", "configuracion");
      await store.dispatch("fetchData", "color");
      await store.dispatch("fetchData", "proceso");
    });

     const GetInfoInforme = () => {
      let info = store.state.informe?.detalle.filter((infor) => {
        if (infor.id_informe == route.params.id) {
          return infor;
        }
      });
      id_linea.value = info[0].id_linea;
    };

    const inicio = () => {
      GetInfoInforme()
      if (store.state.editar) {
        if (
          store.state.objetoEditar != null ||
          store.state.objetoEditar != undefined ||
          store.state.objetoEditar != ""
        ) {
          id_informe.value = store.state.objetoEditar.id_informe;
          peso.value = store.state.objetoEditar.peso;
          id_configuracion.value = store.state.objetoEditar.id_configuracion;
          color.value = store.state.objetoEditar.color;
          material.value = store.state.objetoEditar.material;
          tipo_material.value = store.state.objetoEditar.tipo_material;
          id_proceso.value = store.state.objetoEditar.id_proceso;
          id_linea.value = store.state.objetoEditar.id_linea;
        } else {
          store.state.formulario = false;
        }
      } else {
        id_informe.value = route.params.id;
        peso.value = "";
        id_proceso.value = "";
        tipo_material.value = "";
        material.value = "";
        color.value = "";
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
      id_proceso.value = "";
      tipo_material.value = "";
      material.value = "";
      color.value = "";
      id_configuracion.value = "";
    };

    const enviar = () => {
      //POST
      if (
        id_informe.value != "" &&
        peso.value != "" &&
        color.value != ""
      ) {
        if (!store.state.editar) {

          let obj = {
            id_informe: id_informe.value,
            peso: peso.value,
            id_proceso: id_proceso.value,
            material: material.value,
            tipo_material: tipo_material.value,
            color: color.value,
            pagina: "materia_prima",
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", "materia_prima");
            if (store.state.msm?.status == 404) {
              swal({
                title: store.state.msm.detalle,
                icon: "error",
              });
            } else {
              cerrar();
            }
          

          //PUT
        } else {
          let obj = {
            id_materia_prima: store.state.objetoEditar.id_materia_prima,
            id_informe: id_informe.value,
            peso: peso.value,
            id_proceso: id_proceso.value,
            material: material.value,
            tipo_material: tipo_material.value,
            color: color.value,
            pagina: "materia_prima",
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", "materia_prima");
          setTimeout(() => {
            if (store.state.msm.status == 404) {
              store.state.formulario = false;
              swal({
                title:store.state.msm.detalle,
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

    const procesos = computed(() => {
     return id_linea.value != ""  ? store.state.proceso.detalle?.filter((obj)=>obj.id_linea == id_linea.value) : "";
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
        material.value = ""
        return [];
      }
    });

    const tipos_materiales = computed(() => {
      if (
        id_linea.value?.length != 0 &&
        id_proceso.value?.length != 0 &&
        material.value.length != 0
      ) {
        let filtroByProcesoAndLineaAndMaterial = store.state.configuracion?.detalle.filter(
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
        tipo_material.value = ""
        return [];
      }
    });

    const colores = computed(() => {
      return store.state.color.detalle;
    });

    const editar = computed(() => {
      return store.state.editar;
    });

    const cambioProceso = computed(()=>{
      material.value = ""
      tipo_material.value = ""
    })

    const bloqueomaterial = computed(()=>{
      if (id_proceso.value == ''){
        return true
      }else{
        return false
      }
    })

    return {
      GetInfoInforme,
      cambioProceso,
      bloqueomaterial,
      cerrar,
      editar,
      enviar,
      procesos,
      tipos_materiales,
      materiales,
      colores,
      id_linea,
      id_proceso,
      material,
      tipo_material,
      selectMaterial,
      color,
      id_configuracion,
      id_informe,
      peso,
    };
  },
};
</script>

<style scoped></style>
