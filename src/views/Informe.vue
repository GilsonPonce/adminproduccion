<template>
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
import { useStore } from "vuex";
import { computed, ref, onMounted, onUpdated } from "vue";
export default {
  name: "Color",
  components: {
    cardView,
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
            (obj) => obj[valorParametro.value].indexOf(valorBuscar.value.toUpperCase()) >
            -1
          );
        }
      } else {
        return store.state.informe.detalle;
      }
    });

    const opciones = computed(() => {
      let h = ["id_informe","id","fecha","turno","completado","linea","proceso","material","tipo_material"];
      return h;
    });

    return { informenes,opciones, valorBuscar, valorParametro };
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
</style>