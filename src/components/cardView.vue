<template>
  <div :class="estiloCompletado">
    <div :class="estiloCompletadoHeard">
      <div class="text-start">{{ informe.id_informe }}</div>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <u>{{ informe.linea }}</u>
      </h5>
      <h6 class="card-subtitle mb-2">
        <strong>Proceso: </strong> {{ informe.proceso + " - " + informe.id }}
      </h6>
      <h6 class="card-subtitle mb-2">
        <strong>Material: </strong> {{ informe.material }}
      </h6>
      <h6 class="card-subtitle mb-2">
        <strong>Tipo Material: </strong>{{ informe.tipo_material }}
      </h6>
      <h6 class="card-subtitle mb-2">
        <strong>Fecha de creación: </strong>{{ informe.fecha }}
      </h6>
      <h6 class="card-subtitle mb-2">
        <strong>Turno: </strong>{{ informe.turno }}
      </h6>
      <p class="card-text">
        <strong>Observacion: </strong> {{ informe.observacion }}
      </p>
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Acciones
        </button>
        <ul class="dropdown-menu">
          <li><router-link class="dropdown-item" href="#" :to="`/producto_terminado/${informe.id_informe}`" >Producto Terminado</router-link></li>
          <li><router-link class="dropdown-item" href="#" :to="`/materia_prima/${informe.id_informe}`" >Materia Prima</router-link></li>
          <li><router-link class="dropdown-item" href="#" :to="`/scrap/${informe.id_informe}`" >Scrap</router-link></li>
          <li><router-link class="dropdown-item" href="#" :to="`/registro/${informe.id_informe}`" >Registro Personal</router-link></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#" @click="activarForm">Editar Informe</a></li>
          <li><a class="dropdown-item" href="#" @click="eliminarInforme(informe)">Eliminar Informe</a></li>
          <li><a class="dropdown-item" href="#" >Descarga</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
export default {
  props: ["informe"],
  setup(props) {

    const store = useStore();

  

    const estiloCompletado = computed(() => {
      return props.informe.completado == "1"
        ? " card text-start border-success"
        : "card text-start border-danger";
    });
    const estiloCompletadoHeard = computed(() => {
      return props.informe.completado == "1"
        ? " card-header bg-transparent border-success"
        : "card-header bg-transparent border-danger";
    });

    const activarForm = () => {
      store.state.objetoEditar = props.informe
      store.state.formulario = true
      store.state.editar = true

    }

    const eliminarInforme = (objeto)=>{
      objeto.pagina = "informe"
      store.dispatch("deleteData",objeto)
      store.dispatch("fetchData","informe")
      if(store.state.informe.status != 200){
        swal(
              "Lo siento, se ha producido un error",
              "Ponte en contacto con el administrador",
              "error"
            );
      }

    }

    return { estiloCompletado, estiloCompletadoHeard, activarForm, eliminarInforme };
  },
};
</script>

<style scoped>
.border-success,
.border-danger {
  border-width: 3px;
}
</style>