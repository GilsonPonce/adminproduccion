<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-start">
        <p class="nombreTabla">{{ nombreTabla }}</p>
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
          <div class="col-3 ">
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
          <div class="col-2 ">
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

      <div class="col-12 mt-3">
        <table class="table table-sm table-hover table-bordered">
          <thead class="table-dark">
            <tr id="encabezadoTabla">
              <th scope="col" v-for="(value, index) in header" :key="index">
                {{ value }}
              </th>
              <th scope="col">Operaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in filtro" :key="index" id="cuerpoTabla">
              <th scope="row" v-if="pagina === 'color'">
                {{ value.id_color }}
              </th>
              <th scope="row" v-if="pagina === 'linea'">
                {{ value.id_linea }}
              </th>
              <th scope="row" v-if="pagina === 'material'">
                {{ value.id_material }}
              </th>
              <th scope="row" v-if="pagina === 'tipo_material'">
                {{ value.id_tipo_material }}
              </th>
              <th scope="row" v-if="pagina === 'tipo_desperdicio'">
                {{ value.id_tipo_desperdicio }}
              </th>
              <th scope="row" v-if="pagina === 'proceso'">
                {{ value.id_proceso }}
              </th>
              <th scope="row" v-if="pagina === 'configuracion'">
                {{ value.id_configuracion }}
              </th>
              <th scope="row" v-if="pagina === 'personal'">
                {{ value.id_personal }}
              </th>
              <th scope="row" v-if="pagina === 'producto_terminado'">
                {{ value.id_producto_terminado }}
              </th>
              <td v-if="pagina === 'producto_terminado'">
                {{ value.color }}
              </td>
              <td v-if="pagina === 'producto_terminado'">
                {{ value.peso }}
              </td>
              <td v-if="pagina === 'producto_terminado'">
                {{ value.tipo }}
              </td>
              <td v-if="habilitarLinea">
                {{ value.linea }}
              </td>
              <td v-if="habilitarProceso">
                {{ value.proceso }}
              </td>
              <td v-if="habilitarMaterial">
                {{ value.material }}
              </td>
              <td v-if="habilitarTipoMaterial">
                {{ value.tipo_material }}
              </td>
              <td v-if="pagina === 'configuracion'">
                {{ value.estado == 1 ? "Habilitado" : "Deshabilitado" }}
              </td>
              <td v-if="pagina === 'configuracion'">
                {{ value.kilogramo_diario }}
              </td>
              <td v-if="pagina === 'configuracion'">
                {{ value.kilogramo_hora }}
              </td>
              <td v-if="pagina === 'configuracion'">
                {{ value.tarifa_kilogramo_producidos }}
              </td>
              <td v-if="habilitarNombre">{{ value.nombre }}</td>
               <td v-if="pagina === 'personal'">
                {{ value.apellido }}
              </td>
              <td v-if="pagina === 'personal'">
                {{ value.cedula }}
              </td>
              <td v-if="pagina === 'proceso'">{{ value.linea }}</td>
              <td class="text-end">
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  @click="editar(value)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-danger ms-1"
                  @click="eliminar(value)"
                >
                  -
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import swal from "sweetalert";
export default {
  props: ["nombreTabla", "pagina"],
  setup(props) {
    const store = useStore();

    const valorBuscar = ref("");
    const valorParametro = ref("");

    onMounted(async () => {
      await store.dispatch("fetchData", props.pagina);
    });

    onUpdated(async () => {
      await store.dispatch("fetchData", props.pagina);
    });

    const actualizar = () => {
      location.reload();
    };

    const header = computed(() => {
      let head = [];
      let onedata = {};

      switch (props.pagina) {
        case "color":
          if (store.state.color.length != 0) {
            onedata = store.state.color.detalle[0];
          } else {
            head = ["#", "nombre"];
          }
          break;
        case "linea":
          if (store.state.linea.length != 0) {
            onedata = store.state.linea.detalle[0];
          } else {
            head = ["#", "nombre"];
          }
          break;
        case "material":
          if (store.state.material.length != 0) {
            onedata = store.state.material.detalle[0];
          } else {
            head = ["#", "nombre"];
          }
          break;
        case "tipo_material":
          if (store.state.tipo_material.length != 0) {
            onedata = store.state.tipo_material.detalle[0];
          } else {
            head = ["#", "nombre"];
          }
          break;
        case "tipo_desperdicio":
          if (store.state.tipo_desperdicio.length != 0) {
            onedata = store.state.tipo_desperdicio.detalle[0];
          } else {
            head = ["#", "nombre"];
          }
          break;
        case "proceso":
          if (store.state.proceso.length != 0) {
            onedata = store.state.proceso.detalle[0];
          } else {
            head = ["#", "nombre", "linea"];
          }
          break;
        case "configuracion":
          if (store.state.configuracion.length != 0) {
            onedata = store.state.configuracion.detalle[0];
          } else {
            head = ["#", "nombre", "linea"];
          }
          break;
        case "personal":
          if (store.state.personal.length != 0) {
            onedata = store.state.personal.detalle[0];
          } else {
            head = ["#", "nombre", "linea"];
          }
          break;
        case "producto_terminado":
          if (store.state.producto_terminado.length != 0) {
            onedata = store.state.producto_terminado.detalle[0];
          } else {
            head = ["#", "nombre", "linea"];
          }
          break;
        default:
          head = ["#", "nombre"];
      }

      for (const name in onedata) {
        let startWithId = name.substring(0, 2) == "id" ? true : false;
        let idPagina = name === "id_" + props.pagina ? true : false;
        let numero = Number.isInteger(parseInt(name));
        if (idPagina) {
          head.push("#");
        } else {
          if (!startWithId && !numero) {
            if (name.indexOf("_") < 0) {
              head.push(name);
            } else {
              let n = name.replaceAll("_", " ");
              head.push(n);
            }
          }
        }
      }

      return head;
    });

    const opciones = computed(() => {
      let h = [];
      let onedata = {};
      switch (props.pagina) {
        case "color":
          if (store.state.color.length != 0) {
            onedata = store.state.color.detalle[0];
          }
          break;
        case "linea":
          if (store.state.linea.length != 0) {
            onedata = store.state.linea.detalle[0];
          }
          break;
        case "material":
          if (store.state.material.length != 0) {
            onedata = store.state.material.detalle[0];
          }
          break;
        case "tipo_material":
          if (store.state.tipo_material.length != 0) {
            onedata = store.state.tipo_material.detalle[0];
          }
          break;
        case "tipo_desperdicio":
          if (store.state.tipo_desperdicio.length != 0) {
            onedata = store.state.tipo_desperdicio.detalle[0];
          }
          break;
        case "proceso":
          if (store.state.proceso.length != 0) {
            onedata = store.state.proceso.detalle[0];
          }
          break;
        case "configuracion":
          if (store.state.configuracion.length != 0) {
            onedata = store.state.configuracion.detalle[0];
          }
          break;
        case "personal":
          if (store.state.personal.length != 0) {
            onedata = store.state.personal.detalle[0];
          }
          break;
        case "producto_terminado":
          if (store.state.producto_terminado.length != 0) {
            onedata = store.state.producto_terminado.detalle[0];
          }
          break;
      }
      for (const name in onedata) {
        h.push(name);
      }
      return h;
    });

    const filtro = computed(() => {
      let arrdata = [];
      switch (props.pagina) {
        case "color":
          arrdata = store.state.color.detalle;
          break;
        case "linea":
          arrdata = store.state.linea.detalle;
          break;
        case "material":
          arrdata = store.state.material.detalle;
          break;
        case "tipo_material":
          arrdata = store.state.tipo_material.detalle;
          break;
        case "tipo_desperdicio":
          arrdata = store.state.tipo_desperdicio.detalle;
          break;
        case "proceso":
          arrdata = store.state.proceso.detalle;
          break;
        case "configuracion":
          arrdata = store.state.configuracion.detalle;
          break;
        case "personal":
          arrdata = store.state.personal.detalle;
          break;
        case "producto_terminado":
          arrdata = store.state.producto_terminado.detalle;
          break;
      }
      if (valorBuscar.value != "" && valorParametro.value != "") {
        return arrdata.filter(
          (col) =>
            col[valorParametro.value].indexOf(valorBuscar.value.toUpperCase()) >
            -1
        );
      } else {
        switch (props.pagina) {
          case "color":
            return store.state.color.detalle;
            break;
          case "linea":
            return store.state.linea.detalle;
            break;
          case "material":
            return store.state.material.detalle;
            break;
          case "tipo_material":
            return store.state.tipo_material.detalle;
            break;
          case "tipo_desperdicio":
            return store.state.tipo_desperdicio.detalle;
            break;
          case "proceso":
            return store.state.proceso.detalle;
            break;
          case "configuracion":
            return store.state.configuracion.detalle;
            break;
          case "personal":
            return store.state.personal.detalle;
            break;
          case "producto_terminado":
            return store.state.producto_terminado.detalle;
            break;
        }
      }
    });

    const activar = () => {
      store.state.formulario = true;
    };

    const eliminar = (objeto) => {
      if (objeto != "" || objeto != null || objeto != undefined) {
        swal({
          title: "Seguro que quieres elimminar?",
          text: "Pueden que se eliminen materias primas y productos terminados",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            objeto.pagina = props.pagina;
            store.dispatch("deleteData", objeto);
            store.dispatch("fetchData", props.pagina);
            setTimeout(() => {
              if (store.state.msm.status != 200) {
                swal("Se ha produccido un error", {
                  icon: "error",
                });
              }
            }, 300);
          } else {
            swal("Bien, en otro momento sera!");
          }
        });
      }
    };

    const editar = (objeto) => {
      if (objeto != null || objeto != undefined || objeto != "") {
        store.state.editar = true;
        store.state.objetoEditar = objeto;
        store.state.formulario = true;
      }
    };

     const habilitarNombre = computed(()=>{
       let v1 = props.pagina == "color";
       let v2 = props.pagina == "linea";
       let v3 = props.pagina == "tipo_material";
       let v4 = props.pagina == "material";
       let v5 = props.pagina == "tipo_desperdicio";
       let v6 = props.pagina == "proceso";
       let v7 = props.pagina == "personal";
       if(v1 || v2 || v3 || v4 || v5 || v6 || v7){
         return true
       }else{
         return false
       }
     })

     const habilitarLinea = computed(()=>{
       let v1 = props.pagina == "configuracion";
       let v2 = props.pagina == "producto_terminado";
    
       if(v1 || v2 ){
         return true
       }else{
         return false
       }
     })
     const habilitarProceso = computed(()=>{
       let v1 = props.pagina == "configuracion";
       let v2 = props.pagina == "producto_terminado";
    
       if(v1 || v2 ){
         return true
       }else{
         return false
       }
     })
     const habilitarMaterial = computed(()=>{
       let v1 = props.pagina == "configuracion";
       let v2 = props.pagina == "producto_terminado";
    
       if(v1 || v2 ){
         return true
       }else{
         return false
       }
     })
     const habilitarTipoMaterial = computed(()=>{
       let v1 = props.pagina == "configuracion";
       let v2 = props.pagina == "producto_terminado";
    
       if(v1 || v2 ){
         return true
       }else{
         return false
       }
     })

    return {
      header,
      filtro,
      opciones,
      activar,
      eliminar,
      habilitarNombre,
      habilitarLinea,
      habilitarProceso,
      habilitarMaterial,
      habilitarTipoMaterial,
      editar,
      valorBuscar,
      valorParametro,
      actualizar,
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
#cuerpoTabla th, #cuerpoTabla td {
  font-size: 10px;
  font-weight: 700;
}
#encabezadoTabla th{
  font-size: 12px;
}
</style>
