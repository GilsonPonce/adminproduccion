<template>
  <div v-if="activarFormulario">
    <div class="contenedor">
      <div class="modelo">
        <div>
          <formInforme />
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12 text-start">
        <p class="nombreTabla">Informenes de Produccion</p>
        <hr class="lineaNombre" />
      </div>

      <div class="col-12">
        <div class="row justify-content-end">
          <div class="col-6">
            <div class="input-group">
              <input
                type="search"
                class="form-control form-control-sm rounded"
                placeholder="Buscar"
                aria-label="Search"
                aria-describedby="search-addon"
                v-model="valorBuscar"
              />
            </div>
          </div>

          <div class="col-3">
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              v-model="valorParametro"
            >
              <option
                v-for="(value, index) in opciones"
                v-bind:value="value"
                :key="index"
              >
                {{ value }}
              </option>
            </select>
          </div>

          <div class="col-2">
            <button
              class="btn btn-sm btn-primary"
              type="button"
              @click="activar"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-6 mt-3" v-for="(value, index) in informenes" :key="index">
        <cardView :informe="value" />
      </div>
    </div>
  </div>
</template>

<script>
import cardView from "@/components/cardView.vue";
import formInforme from "../components/formInforme.vue";
import { useStore } from "vuex";
import { computed, ref, onMounted, onUpdated } from "vue";
export default {
  name: "Color",
  components: {
    cardView,
    formInforme,
  },
  setup() {
    const store = useStore();

    const valorBuscar = ref("");
    const valorParametro = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "informe");
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", "informe");
    });

    const informenes = computed(() => {
      if (valorBuscar.value != "" && valorParametro.value != "") {
        if (store.state.informe != undefined || store.state.informe != null) {
          return store.state.informe.detalle.filter(
            (obj) =>
              obj[valorParametro.value].indexOf(
                valorBuscar.value.toUpperCase()
              ) > -1
          );
        }
      } else {
        return store.state.informe.detalle;
      }
    });

    const opciones = computed(() => {
      let h = [
        "id_informe",
        "id",
        "fecha",
        "turno",
        "completado",
        "linea",
        "proceso",
        "material",
        "tipo_material",
      ];
      return h;
    });

    const activar = computed(() => {
      console.log("activar");
      store.state.formulario = true;
    });

    const activarFormulario = computed(() => {
      return store.state.formulario;
    });

    return {
      informenes,
      opciones,
      valorBuscar,
      activar,
      valorParametro,
      activarFormulario,
    };
  },
};
</script>

<style scoped>
.lineaNombre {
  margin-top: 0px;
}
.nombreTabla {
  margin-bottom: 0px;
}
.contenedor {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.541);
}
.modelo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: auto 200px;
  position: relative;
  top: 18%;
}
</style>