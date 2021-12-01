
import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'
import { useRouter } from "vue-router";

export default createStore({
  state: {
    token: null,
    formulario: false,
    editar: false,
    loading: false,
    id: 0,
    objetoEditar: {},
    nombreUsuario: "",
    msm: [],
    url: "https://novaproduccion.gjponce.com/hgdferapi",//"http://localhost:8080/hgdferapi"
    material: [],
    tipo_material: [],
    tipo_desperdicio: [],
    color: [],
    linea: [],
    proceso: [],
    scrap: [],
    informe: [],
    materia_prima: [],
    producto_terminado: [],
    registro: [],
    personal: [],
    configuracion: [],
    usuario: [],
    seleccionInforme: [],
  },
  mutations: {
    setColor(state, payload) {
      state.color = payload
    },
    setLinea(state, payload) {
      state.linea = payload
    },
    setMaterial(state, payload) {
      state.material = payload
    },
    setTipo_material(state, payload) {
      state.tipo_material = payload
    },
    setTipo_desperdicio(state, payload) {
      state.tipo_desperdicio = payload
    },
    setProceso(state, payload) {
      state.proceso = payload
    },
    setMateria_prima(state, payload) {
      state.materia_prima = payload
    },
    setScrap(state, payload) {
      state.scrap = payload
    },
    setProducto_terminado(state, payload) {
      state.producto_terminado = payload
    },
    setRegistro(state, payload) {
      state.registro = payload
    },
    setPersonal(state, payload) {
      state.personal = payload
    },
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setConfiguracion(state, payload) {
      state.configuracion = payload
    },
    setInforme(state, payload) {
      state.informe = payload
    },
    setmsm(state, payload) {
      state.msm = payload
    },
    setloading(state, payload) {
      state.loading = payload
    },
    falseFormulario(state) {
      state.formulario = false
    },
    trueFormulario(state) {
      state.formulario = true
    }
  },
  actions: {
    async fetchData({ commit, state }, pagina) {
      const router = useRouter();
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        let res = null;
        let data = null;

        res = await fetch(state.url + "/" + pagina, requestOptions);
        data = await res.json();



        if (VueCookies.get("sesion")) {
          switch (pagina) {
            case "color":
              if (res.ok && data.status == 200) {
                commit("setColor", data);
                commit("setloading", false);
              }
              break;
            case "linea":
              if (res.ok && data.status == 200) {
                commit("setLinea", data);
                commit("setloading", false);
              }
              break;
            case "material":
              if (res.ok && data.status == 200) {
                commit("setMaterial", data);
                commit("setloading", false);
              }
              break;
            case "tipo_material":
              if (res.ok && data.status == 200) {
                commit("setTipo_material", data);
                commit("setloading", false);
              }
              break;
            case "tipo_scrap":
              if (res.ok && data.status == 200) {
                commit("setTipo_desperdicio", data);
                commit("setloading", false);
              }
              break;
            case "proceso":
              if (res.ok && data.status == 200) {
                commit("setProceso", data);
                commit("setloading", false);
              }
              break;
            case "materia_prima":
              if (res.ok && data.status == 200) {
                commit("setMateria_prima", data);
                commit("setloading", false);
              }
              break;
            case "configuracion":
              if (res.ok && data.status == 200) {
                commit("setConfiguracion", data);
                commit("setloading", false);
              }
              break;
            case "scrap":
              if (res.ok && data.status == 200) {
                commit("setScrap", data);
                commit("setloading", false);
              }
              break;
            case "producto_terminado":
              if (res.ok && data.status == 200) {
                commit("setProducto_terminado", data);
                commit("setloading", false);
              }
              break;
            case "registro":
              if (res.ok && data.status == 200) {
                commit("setRegistro", data);
                commit("setloading", false);
              }
              break;
            case "personal":
              if (res.ok && data.status == 200) {
                commit("setPersonal", data);
                commit("setloading", false);
              }
              break;
            case "usuario":
              if (res.ok && data.status == 200) {
                commit("setUsuario", data);
                commit("setloading", false);
              }
              break;
            case "informe":
              if (res.ok && data.status == 200) {
                commit("setInforme", data);
                commit("setloading", false);
              }
              break;
          }

        } else {
          commit("setloading", false);
          state.token = null;
          router.push("/");
        }

      } catch (error) {
        commit("setloading", false);
        console.log(error)
      }
    },

    async postData({ commit, state }, objeto) {
      const router = useRouter();
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);

        var formdata = new FormData();
        let res = null;
        if (VueCookies.get("sesion")) {
          switch (objeto.pagina) {
            case "color":
              formdata.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "registro":
              formdata.append("id_personal", objeto.id_personal);
              formdata.append("id_informe", objeto.id_informe);
              break;
            case "proceso":
              formdata.append("nombre", objeto.nombre.toUpperCase());
              formdata.append("id_linea", objeto.id_linea);
              break;
            case "configuracion":
              formdata.append("kilogramo_diario", objeto.kilogramo_diario);
              formdata.append("kilogramo_hora", objeto.kilogramo_hora);
              formdata.append("tarifa_kilogramo_producidos", objeto.tarifa_kilogramo_producidos);
              formdata.append("estado", objeto.estado);
              formdata.append("id_proceso", objeto.id_proceso);
              formdata.append("material", objeto.material);
              formdata.append("tipo_material", objeto.tipo_material);
              break;
            case "materia_prima":
              formdata.append("id_proceso", objeto.id_proceso);
              formdata.append("tipo_material", objeto.tipo_material);
              formdata.append("material", objeto.material);
              formdata.append("color", objeto.color);
              formdata.append("id_informe", objeto.id_informe);
              formdata.append("peso", objeto.peso);
              break;
            case "producto_terminado":
              formdata.append("id_proceso", objeto.id_proceso);
              formdata.append("tipo_material", objeto.tipo_material);
              formdata.append("material", objeto.material);
              formdata.append("id_informe", objeto.id_informe);
              formdata.append("color", objeto.color);
              formdata.append("peso", objeto.peso);
              formdata.append("tipo", objeto.tipo);
              break;
            case "personal":
              formdata.append("id_personal", objeto.id_personal);
              formdata.append("nombre", objeto.nombre.toUpperCase());
              formdata.append("apellido", objeto.apellido.toUpperCase());
              formdata.append("cedula", objeto.cedula);
              break;
            case "usuario":
              formdata.append("nombre", objeto.nombre.toUpperCase());
              formdata.append("apellido", objeto.apellido.toUpperCase());
              formdata.append("cedula", objeto.cedula);
              formdata.append("correo", objeto.correo);
              formdata.append("pass", objeto.pass);
              formdata.append("activo", objeto.activo);
              break;
            case "informe":
              formdata.append("id_informe", objeto.id_informe);
              formdata.append("id", objeto.id);
              formdata.append("turno", objeto.turno);
              formdata.append("saldo_anterior", objeto.saldo_anterior);
              formdata.append("observacion", objeto.observacion);
              formdata.append("completado", objeto.completado);
              formdata.append("id_proceso", objeto.id_proceso);
              break;
            case "scrap":
              formdata.append("motivo", objeto.motivo);
              formdata.append("sacos", objeto.sacos);
              formdata.append("peso", objeto.peso);
              formdata.append("id_informe", objeto.id_informe);
              break;
            default:
              formdata.append("nombre", objeto.nombre.toUpperCase());
          }

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          res = await fetch(state.url + "/" + objeto.pagina, requestOptions);


        } else {
          commit("setloading", false);
          state.token = null;
          router.push("/");
        }

        const data = await res.json()
        if (res.ok && data?.status == 200) {
          commit("setmsm", data)
          commit("setloading", false);
        }
      } catch (error) {
        commit("setloading", false);
        console.log(error)
      }
    },

    async deleteData({ commit, state }, objeto) {
      const router = useRouter();
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        let res = null;
        if (VueCookies.get("sesion")) {
          res = await fetch(state.url + "/" + objeto.pagina + "/" + objeto["id_" + objeto.pagina], requestOptions);
        } else {
          commit("setloading", false);
          state.token = null;
          router.push("/");
        }
        const data = await res.json()
        if (res.ok && data.status == 200) {
          commit("setmsm", data)
          commit("setloading", false);
        }

      } catch (error) {
        commit("setloading", false);
        console.log(error)
      }
    },

    async putData({ commit, state }, objeto) {
      const router = useRouter();
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        let res = null;

        if (VueCookies.get("sesion")) {
          switch (objeto.pagina) {
            case "color":
              urlencoded.append("id_color", objeto.id_color);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "linea":
              urlencoded.append("id_linea", objeto.id_linea);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "material":
              urlencoded.append("id_material", objeto.id_material);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "tipo_material":
              urlencoded.append("id_tipo_material", objeto.id_tipo_material);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "tipo_scrap":
              urlencoded.append("id_tipo_scrap", objeto.id_tipo_scrap);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              break;
            case "configuracion":
              urlencoded.append("id_configuracion", objeto.id_configuracion);
              urlencoded.append("kilogramo_diario", objeto.kilogramo_diario);
              urlencoded.append("kilogramo_hora", objeto.kilogramo_hora);
              urlencoded.append("tarifa_kilogramo_producidos", objeto.tarifa_kilogramo_producidos);
              urlencoded.append("estado", objeto.estado);
              urlencoded.append("id_proceso", objeto.id_proceso);
              urlencoded.append("material", objeto.material);
              urlencoded.append("tipo_material", objeto.tipo_material);
              break;
            case "proceso":
              urlencoded.append("id_proceso", objeto.id_proceso);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              urlencoded.append("id_linea", objeto.id_linea);
              break;
            case "personal":
              urlencoded.append("id_personal", objeto.id_personal);
              urlencoded.append("nombre", objeto.nombre.toUpperCase());
              urlencoded.append("apellido", objeto.apellido.toUpperCase());
              urlencoded.append("cedula", objeto.cedula);
              break;
            case "materia_prima":
              urlencoded.append("id_materia_prima", objeto.id_materia_prima);
              urlencoded.append("id_proceso", objeto.id_proceso);
              urlencoded.append("tipo_material", objeto.tipo_material);
              urlencoded.append("material", objeto.material);
              urlencoded.append("color", objeto.color);
              urlencoded.append("id_informe", objeto.id_informe);
              urlencoded.append("peso", objeto.peso);
              break;
            case "producto_terminado":
              urlencoded.append("id_proceso", objeto.id_proceso);
              urlencoded.append("tipo_material", objeto.tipo_material);
              urlencoded.append("material", objeto.material);
              urlencoded.append("id_producto_terminado", objeto.id_producto_terminado);
              urlencoded.append("id_informe", objeto.id_informe);
              urlencoded.append("color", objeto.color);
              urlencoded.append("peso", objeto.peso);
              urlencoded.append("tipo", objeto.tipo);
              break;
            case "scrap":
              urlencoded.append("id_scrap", objeto.id_scrap);
              urlencoded.append("motivo", objeto.motivo);
              urlencoded.append("sacos", objeto.sacos);
              urlencoded.append("peso", objeto.peso);
              urlencoded.append("id_informe", objeto.id_informe);
              break;
            case "registro":
              urlencoded.append("id_registro", objeto.id_registro);
              urlencoded.append("fecha_hora_inicio", objeto.fecha_hora_inicio);
              urlencoded.append("fecha_hora_fin", objeto.fecha_hora_fin);
              urlencoded.append("id_personal", objeto.id_personal);
              urlencoded.append("id_informe", objeto.id_informe);
              urlencoded.append("activo", objeto.activo);
              break;
            case "usuario":
              urlencoded.append("id_usuario", objeto.id_usuario);
              urlencoded.append("nombre", objeto.nombre);
              urlencoded.append("apellido", objeto.apellido);
              urlencoded.append("cedula", objeto.cedula);
              urlencoded.append("correo", objeto.correo);
              urlencoded.append("pass", objeto.pass);
              urlencoded.append("activo", objeto.activo);
              break;
            case "informe":
              urlencoded.append("id_informe", objeto.id_informe);
              urlencoded.append("id", objeto.id);
              urlencoded.append("fecha", objeto.fecha);
              urlencoded.append("turno", objeto.turno);
              urlencoded.append("saldo_anterior", objeto.saldo_anterior);
              urlencoded.append("observacion", objeto.observacion);
              urlencoded.append("completado", objeto.completado);
              urlencoded.append("id_proceso", objeto.id_proceso);
              break;

          }

          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          };

          res = await fetch(state.url + "/" + objeto.pagina + "/" + objeto["id_" + objeto.pagina], requestOptions);

        } else {
          commit("setloading", false);
          state.token = null;
          router.push("/");
        }

        const data = await res.json();
        if (res.ok && (data.status == 200 || data.status == 404)) {
          commit("setmsm", data)
          commit("setloading", false);
        }

      } catch (error) {
        commit("setloading", false);
        console.log(error)
      }
    },

  },
  modules: {
  },
  getters: {
    getFiltroPT(state) {
      if (state.producto_terminado.detalle != undefined) {
        return state.producto_terminado.detalle.filter((obj) =>
          obj.id_informe == state.id
        )
      }
    },
    getFiltroMP(state) {
      if (state.materia_prima.detalle != undefined) {
        return state.materia_prima.detalle.filter((obj) =>
          obj.id_informe == state.id
        )
      }
    },
    getFiltroSRP(state) {
      if (state.scrap.detalle != undefined) {
        return state.scrap.detalle.filter((obj) =>
          obj.id_informe == state.id
        )
      }
    },
    getFiltroRGT(state) {
      if (state.registro.detalle != undefined) {
        return state.registro.detalle.filter((obj) =>
          obj.id_informe == state.id
        )
      }
    }
  }
})
