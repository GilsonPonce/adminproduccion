<template>
  <div class="container">
    <div class="row justify-content-center">
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
    </div>
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
      store.state.loading = true;
      store.dispatch("fetchData", "linea");
      store.dispatch("fetchData", "proceso");
    });

    const falseFormulario = () => {
      store.state.editar = false;
      store.state.objetoEditar = {};
      store.state.formulario = false;
    };

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
      }
    };
    inicio();

    const postData = computed(() => {
      //POST
      if (!store.state.editar) {
        store.state.loading = true;
        let obje = {
          id_informe: id_informe.value,
          id: id.value,
          fecha: fecha.value,
          turno: turno.value,
          saldo_anterior: saldo_anterior.value,
          observacion: observacion.value,
          completado: completado.value,
          id_proceso: id_proceso.value,
          pagina: "informe",
        };
        store.dispatch("postData", obje);
        //store.dispatch("fetchData", "informe");

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
        store.commit("falseFormulario");

        if (store.state.msm?.status == 404) {
          store.commit("falseFormulario");
          swal(store.state.msm?.detalle, "", "warning");
        }

        //PUT
      } else if (store.state.editar) {
        store.state.loading = true;
        let obj = {
          id_informe: store.state.objetoEditar.id_informe,
          id: store.state.objetoEditar.id,
          fecha: fecha.value,
          turno: turno.value,
          saldo_anterior: saldo_anterior.value,
          observacion: observacion.value,
          completado: completado.value,
          id_proceso: id_proceso.value,
          pagina: "informe",
        };
        store.dispatch("putData", obj);
        //store.dispatch("fetchData", "informe");
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

        if (store.state.msm?.status == 404) {
          swal(
            store.state.msm?.detalle,
            "Ponte en contacto con el administrador",
            "error"
          );
        }
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
      falseFormulario();
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

    const generar_ids = () => {
      if (!store.state.editar) {
        let arrayidinforme = [];
        let arrayidproceso = [];
        if (store.state.informe?.status == 200) {
          let arraydata = store.state.informe?.detalle;
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
          } else if (arrayidproceso.length == 0 && arrayidinforme.length != 0) {
            id.value = 1;
            id_informe.value = Math.max(...arrayidinforme) + 1;
          } else {
            id.value = 1;
            id_informe.value = 1;
          }
        }
      }
    };

    const habilitarFecha = computed(() => {
      return !store.state.editar;
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
    };
  },
};
</script>
