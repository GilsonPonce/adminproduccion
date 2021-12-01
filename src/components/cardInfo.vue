<template>
  <div class="caja">
    <h6>{{ data.titulo }}</h6>
    <p>{{ data.conteo }}</p>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["data"],
  setup(props) {},
};
</script>

<style scoped>
.caja {
  background-color: rgb(16, 75, 23);
  overflow: hidden;
  width: auto;
  height: auto;
  padding: 10px;
  text-align: left;
  color: white;
  border-radius: 10px;
}
</style>
