<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-2">
        <label for="motivo" class="form-label form-label-sm"
          >Motivo:</label
        >
        <select
          id="motivo"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="motivo"
        >
          <option
            v-for="moti in motivos"
            v-bind:value="moti.nombre"
            v-bind:key="moti.id_tipo_desperdicio"
          >
            {{ moti.nombre }}
          </option>
        </select>
      </div>
      <div class="col-12 mt-3">
        <label for="sacos" class="form-label form-label-sm"
          >Sacos:</label
        >
        <input
          type="numeric"
          id="sacos"
          class="form-control form-control-sm"
          v-model="sacos"
        />
      </div>
      <div class="col-12 mt-3">
        <label for="peso" class="form-label form-label-sm"
          >Peso:</label
        >
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

    const motivo = ref("");
    const sacos = ref("");
    const peso = ref("");
    const id_informe = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", "tipo_desperdicio");
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
          motivo.value = store.state.objetoEditar.motivo;
          sacos.value = store.state.objetoEditar.sacos;
        } else {
          store.state.formulario = false;
        }
      } else {
        id_informe.value = route.params.id;
        peso.value = "";
        motivo.value = "";
        sacos.value = "";
      }
    };
    inicio();

    const cerrar = () => {
      store.state.formulario = false;
      store.state.editar = false;
      store.state.objetoEditar = {};
      id_informe.value = route.params.id;
      peso.value = "";
      motivo.value = "";
      sacos.value = "";
    };

    const enviar = () => {
      //POST
      if (
        id_informe.value != "" &&
        peso.value != "" &&
        sacos.value != "" &&
        motivo.value != ""
      ) {
        if (!store.state.editar) {
          let obj = {
            id_informe: id_informe.value,
            peso: peso.value,
            motivo: motivo.value,
            sacos: sacos.value,
            pagina: "scrap",
          };
          store.dispatch("postData", obj);
          store.dispatch("fetchData", "scrap");
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
            id_scrap: store.state.objetoEditar.id_scrap,
            id_informe: id_informe.value,
            peso: peso.value,
            motivo: motivo.value,
            sacos: sacos.value,
            pagina: "scrap",
          };
          store.dispatch("putData", obj);
          store.dispatch("fetchData", "scrap");
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

    const motivos = computed(() => {
      return store.state.tipo_desperdicio.detalle;
    });

    const editar = computed(() => {
      return store.state.editar;
    });

    return {
      cerrar,
      editar,
      motivos,
      enviar,
      id_informe,
      motivo,
      sacos,
      peso,
    };
  },
};
</script>

<style scoped></style>
