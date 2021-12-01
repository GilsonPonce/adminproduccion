<template>
  <div class="container">
    <div class="row">
      <!--
      <div class="col-2 mt-3" v-for="(value, index) in info" :key="index">
        <cardInfo :data="datos(value)" />
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import cardInfo from "@/components/cardInfo.vue";
export default {
  name: "Home",
  components: {
    cardInfo,
  },
  setup() {
    const store = useStore();
    const info = ["informe", "personal", "material", "linea", "proceso"];

    const datos = (nombre) => {
      let da = new Object();
      if (nombre == "informe") {
        store.dispatch("fetchData", "informe");
        let total = store.state.informe.total_registro;
        da.titulo = "Informenes";
        da.conteo = total;
        return da;
      } else if (nombre == "personal") {
        store.dispatch("fetchData", "personal");
        let total = store.state.personal.total_registro;
        da.titulo = "Personal";
        da.conteo = total;
        return da;
      } else if (nombre == "material") {
        store.dispatch("fetchData", "material");
        let total = store.state.material.total_registro;
        da.titulo = "Materiales";
        da.conteo = total;
        return da;
      } else if (nombre == "linea") {
        store.dispatch("fetchData", "linea");
        let total = store.state.linea.total_registro;
        da.titulo = "Lineas";
        da.conteo = total;
        return da;
      } else if (nombre == "proceso") {
        store.dispatch("fetchData", "proceso");
        let total = store.state.proceso.total_registro;
        da.titulo = "Procesos";
        da.conteo = total;
        return da;
      }
    };

    return{
        info,
        datos,
    }
  },
};
</script>

<style></style>
