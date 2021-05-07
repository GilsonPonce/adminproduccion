<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mt-3">
        <label for="idLinea" class="form-label form-label-sm">Linea:</label>
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
          >Proceso:
        </label>
        <select
          id="idproceso"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_proceso"
          :disabled="id_linea == ''"
          @change="generar_ids"
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
      <div class="col-4 mt-3">
        <label for="idmaterial" class="form-label form-label-sm"
          >Material:
        </label>
        <select
          id="idmaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_material"
        >
          <option
            v-for="ma in materiales"
            v-bind:value="ma.id_material"
            v-bind:key="ma.id_material"
          >
            {{ ma.nombre }}
          </option>
        </select>
      </div>
      <div class="col-4 mt-3">
        <label for="idtipomaterial" class="form-label form-label-sm"
          >Tipo de Material:
        </label>
        <select
          id="idtipomaterial"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="id_tipo_material"
        >
          <option
            v-for="tm in tipos_materiales"
            v-bind:value="tm.id_tipo_material"
            v-bind:key="tm.id_tipo_material"
          >
            {{ tm.nombre }}
          </option>
        </select>
      </div>
      <div class="col-4 mt-3">
        <label for="estado" class="form-label form-label-sm"
          >Completado?:</label
        >
        <select
          id="estado"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="completado"
        >
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>
      <div class="col-4 mt-3">
        <label for="saldo" class="form-label form-label-sm"
          >Saldo Anterior:</label
        >
        <input
          type="number"
          id="saldo"
          class="form-control form-control-sm"
          v-model="saldo_anterior"
        />
      </div>
      <div class="col-4 mt-3">
        <label for="turno" class="form-label form-label-sm">Turno:</label>
        <select
          id="turno"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="turno"
        >
          <option value="DIURNO">DIURNO</option>
          <option value="NOCTURNO">NOCTURNO</option>
        </select>
      </div>
      <div class="col-4 mt-3">
        <label for="fecha" class="form-label form-label-sm">Fecha</label>
        <input
          type="date"
          id="fecha"
          class="form-control form-control-sm"
          v-model="fecha"
          :disabled="habilitarFecha"
        />
      </div>
      <div class="col-2 mt-3">
        <label for="idInforme" class="form-label form-label-sm"
          >Id informe:</label
        >
        <input
          type="number"
          id="idInforme"
          class="form-control form-control-sm"
          v-model="id_informe"
          disabled
        />
      </div>
      <div class="col-2 mt-3">
        <label for="id" class="form-label form-label-sm">Id:</label>
        <input
          type="number"
          id="id"
          class="form-control form-control-sm"
          v-model="id"
          disabled
        />
      </div>
      <div class="col-12 mt-3">
        <label for="observacion">Observacion: </label>
        <textarea
          class="form-control"
          id="observacion"
          rows="3"
          v-model="observacion"
        ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col mt-3">
        <button class="btn btn-primary" @click="postData">Aplicar</button>
        <button class="btn btn-danger ms-3" @click="cerrar">Cancelar</button>
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();

    const id_material = ref("");
    const id_tipo_material = ref("");
    const id_linea = ref("");
    const id_proceso = ref("");
    const completado = ref("");
    const id = ref("");
    const id_informe = ref("");
    const fecha = ref("");
    const saldo_anterior = ref("");
    const observacion = ref("");
    const turno = ref("");

    onMounted(() => {
      store.dispatch("fetchData", "linea");
      store.dispatch("fetchData", "proceso");
      store.dispatch("fetchData", "tipo_material");
      store.dispatch("fetchData", "material");
    });

    const falseFormulario = computed(() => {
      store.state.editar = false;
      store.state.objetoEditar = {};
      store.state.formulario = false;
    });

    const inicio = () => {
      if (store.state.editar) {
        id.value = store.state.objetoEditar.id;
        id_informe.value = store.state.objetoEditar.id_informe;
        fecha.value = store.state.objetoEditar.fecha;
        turno.value = store.state.objetoEditar.turno;
        saldo_anterior.value = store.state.objetoEditar.saldo_anterior;
        observacion.value = store.state.objetoEditar.observacion;
        completado.value = store.state.objetoEditar.completado;
        id_linea.value = store.state.objetoEditar.id_linea;
        id_proceso.value = store.state.objetoEditar.id_proceso;
        id_material.value = store.state.objetoEditar.id_material;
        id_tipo_material.value = store.state.objetoEditar.id_tipo_material;
      } else {
        id.value = "";
        id_informe.value = "";
        fecha.value = "";
        turno.value = "";
        saldo_anterior.value = "";
        observacion.value = "";
        completado.value = "";
        id_linea.value = "";
        id_proceso.value = "";
        id_material.value = "";
        id_tipo_material.value = "";
      }
    };
    inicio();

    const postData = computed(() => {
      //POST
      if (!store.state.editar) {
        let obje = {
          id_informe: id_informe.value,
          id: id.value,
          fecha: fecha.value,
          turno: turno.value,
          saldo_anterior: saldo_anterior.value,
          observacion: observacion.value,
          completado: completado.value,
          id_proceso: id_proceso.value,
          id_material: id_material.value,
          id_tipo_material: id_tipo_material.value,
          pagina: "informe",
        };
        store.dispatch("postData", obje);
        store.dispatch("fetchData", "informe");
        setTimeout(() => {
          if (store.state.msm.status == 200) {
            id.value = "";
            id_informe.value = "";
            fecha.value = "";
            turno.value = "";
            turno.value = "";
            saldo_anterior.value = "";
            observacion.value = "";
            completado.value = "";
            id_linea.value = "";
            id_proceso.value = "";
            id_material.value = "";
            id_tipo_material.value = "";
            store.commit("falseFormulario");
          } else {
            store.commit("falseFormulario");
            swal("Error en registros", "", "warning");
          }
        }, 500);
        //PUT
      } else if (store.state.editar) {
        let obj = {
          id_informe: store.state.objetoEditar.id_informe,
          id: store.state.objetoEditar.id,
          fecha: fecha.value,
          turno: turno.value,
          saldo_anterior: saldo_anterior.value,
          observacion: observacion.value,
          completado: completado.value,
          id_proceso: id_proceso.value,
          id_material: id_material.value,
          id_tipo_material: id_tipo_material.value,
          pagina: "informe",
        };
        store.dispatch("putData", obj);
        store.dispatch("fetchData", "informe");
        setTimeout(() => {
          if (store.state.msm.status == 200) {
            store.state.editar = false;
            store.state.objetoEditar = {};
            store.state.formulario = false;
            id.value = "";
            id_informe.value = "";
            fecha.value = "";
            turno.value = "";
            turno.value = "";
            saldo_anterior.value = "";
            observacion.value = "";
            completado.value = "";
            id_linea.value = "";
            id_proceso.value = "";
            id_material.value = "";
            id_tipo_material.value = "";
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

    const editarFor = computed(() => {
      return store.state.editar;
    });

    const cerrar = computed(() => {
      store.state.formulario = false;
    });

    const lineas = computed(() => {
      if (store.state.linea.status == 200) {
        return store.state.linea.detalle;
      }
    });
    const procesos = computed(() => {
      if (store.state.proceso.status == 200) {
        if (store.state.proceso.status == 200 && id_linea.value != "") {
          return store.state.proceso.detalle.filter(
            (obj) => obj.id_linea == id_linea.value
          );
        } else {
          return store.state.proceso.detalle;
        }
      }
    });
    const tipos_materiales = computed(() => {
      if (store.state.tipo_material.status == 200) {
        return store.state.tipo_material.detalle;
      }
    });
    const materiales = computed(() => {
      if (store.state.material.status == 200) {
        return store.state.material.detalle;
      }
    });

    const generar_ids = () => {
      if (!store.state.editar) {
        let arrayidinforme = [];
        let arrayidproceso = [];
        if (store.state.informe.status == 200) {
          let arraydata = store.state.informe.detalle;
          let arrayInformenesProceso = arraydata.filter(
            (ob) => ob.id_proceso == id_proceso.value
          ); //obtengo los informenes de este proceso
          arraydata.map((inf) => {
            arrayidinforme.push(parseInt(inf.id_informe, 10)); // agrego todo los id de los informenes
          });
          arrayInformenesProceso.map((info) => {
            arrayidproceso.push(parseInt(info.id, 10)); // agrego los id de los informenes del proceso
          });
          if (arrayidinforme.length != 0 && arrayidproceso.length != 0) {
            id.value = Math.max(...arrayidproceso) + 1;
            id_informe.value = Math.max(...arrayidinforme) + 1;
          }else if (arrayidproceso.length == 0 && arrayidinforme.length != 0){
            id.value =  1;
            id_informe.value = Math.max(...arrayidinforme) + 1;
          }else{
             id.value =  1;
             id_informe.value = 1;
          }
        }
      }
    };

    const habilitarFecha = computed(()=>{
      return !store.state.editar
    });

    return {
      cerrar,
      habilitarFecha,
      falseFormulario,
      inicio,
      postData,
      editarFor,
      lineas,
      procesos,
      materiales,
      tipos_materiales,
      generar_ids,
      id_informe,
      id,
      fecha,
      turno,
      saldo_anterior,
      observacion,
      completado,
      id_linea,
      id_proceso,
      id_material,
      id_tipo_material,
    };
  },
};
</script>
