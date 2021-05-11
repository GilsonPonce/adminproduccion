
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    formulario: false,
    editar: false,
    id: 0,
    objetoEditar: {},
    msm: [],
    urlLogin: "http://localhost:8080/api/login",
    urlColor: "http://localhost:8080/api/color",
    urlLinea: "http://localhost:8080/api/linea",
    urlMaterial: "http://localhost:8080/api/material",
    urlTipo_material: "http://localhost:8080/api/tipo_material",
    urlTipo_desperdicio: "http://localhost:8080/api/tipo_desperdicio",
    urlProceso: "http://localhost:8080/api/proceso",
    urlScrap: "http://localhost:8080/api/scrap",
    urlProducto_terminado: "http://localhost:8080/api/producto_terminado",
    urlMateria_prima: "http://localhost:8080/api/materia_prima",
    urlRegistro: "http://localhost:8080/api/registro",
    urlInforme: "http://localhost:8080/api/informe",
    urlPersonal: "http://localhost:8080/api/personal",
    urlUsuario: "http://localhost:8080/api/usuario",
    urlConfiguracion: "http://localhost:8080/api/configuracion",
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
    falseFormulario(state) {
      state.formulario = false
    },
    trueFormulario(state) {
      state.formulario = true
    }
  },
  actions: {
    async fetchData({ commit, state }, pagina) {
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
        switch (pagina) {
          case "color":
            res = await fetch(state.urlColor, requestOptions);
            data = await res.json();
            commit("setColor", data);
            break;
          case "linea":
            res = await fetch(state.urlLinea, requestOptions);
            data = await res.json();
            commit("setLinea", data);
            break;
          case "material":
            res = await fetch(state.urlMaterial, requestOptions);
            data = await res.json();
            commit("setMaterial", data);
            break;
          case "tipo_material":
            res = await fetch(state.urlTipo_material, requestOptions);
            data = await res.json();
            commit("setTipo_material", data);
            break;
          case "tipo_desperdicio":
            res = await fetch(state.urlTipo_desperdicio, requestOptions);
            data = await res.json();
            commit("setTipo_desperdicio", data);
            break;
          case "proceso":
            res = await fetch(state.urlProceso, requestOptions);
            data = await res.json();
            commit("setProceso", data);
            break;
          case "materia_prima":
            res = await fetch(state.urlMateria_prima, requestOptions);
            data = await res.json();
            commit("setMateria_prima", data);
            break;
          case "configuracion":
            res = await fetch(state.urlConfiguracion, requestOptions);
            data = await res.json();
            commit("setConfiguracion", data);
            break;
          case "scrap":
            res = await fetch(state.urlScrap, requestOptions);
            data = await res.json();
            commit("setScrap", data);
            break;
          case "producto_terminado":
            res = await fetch(state.urlProducto_terminado, requestOptions);
            data = await res.json();
            commit("setProducto_terminado", data);
            break;
          case "registro":
            res = await fetch(state.urlRegistro, requestOptions);
            data = await res.json();
            commit("setRegistro", data);
            break;
          case "personal":
            res = await fetch(state.urlPersonal, requestOptions);
            data = await res.json();
            commit("setPersonal", data);
            break;
          case "usuario":
            res = await fetch(state.urlUsuario, requestOptions);
            data = await res.json();
            commit("setUsuario", data);
            break;
          case "informe":
            res = await fetch(state.urlInforme, requestOptions);
            data = await res.json();
            commit("setInforme", data);
            break;

        }

      } catch (error) {
        console.log(error)
      }
    },

    async postData({ commit, state }, objeto) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);

        var formdata = new FormData();

        console.log(objeto)

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
            formdata.append("id_material", objeto.id_material);
            formdata.append("id_tipo_material", objeto.id_tipo_material);
            break;
          case "materia_prima":
            formdata.append("id_configuracion", objeto.id_configuracion);
            formdata.append("id_color", objeto.id_color);
            formdata.append("id_informe", objeto.id_informe);
            formdata.append("peso", objeto.peso);
            break;
          case "producto_terminado":
            formdata.append("id_informe", objeto.id_informe);
            formdata.append("id_color", objeto.id_color);
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
            break;
          case "informe":
            formdata.append("id_informe", objeto.id_informe);
            formdata.append("id", objeto.id);
            formdata.append("turno", objeto.turno);
            formdata.append("saldo_anterior", objeto.saldo_anterior);
            formdata.append("observacion", objeto.observacion);
            formdata.append("completado", objeto.completado);
            formdata.append("id_proceso", objeto.id_proceso);
            formdata.append("id_material", objeto.id_material);
            formdata.append("id_tipo_material", objeto.id_tipo_material);
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

        let res = null;
        switch (objeto.pagina) {
          case "color":
            res = await fetch(state.urlColor, requestOptions);
            break;
          case "linea":
            res = await fetch(state.urlLinea, requestOptions)
            break;
          case "material":
            res = await fetch(state.urlMaterial, requestOptions)
            break;
          case "tipo_material":
            res = await fetch(state.urlTipo_material, requestOptions)
            break;
          case "tipo_desperdicio":
            res = await fetch(state.urlTipo_desperdicio, requestOptions)
            break;
          case "proceso":
            res = await fetch(state.urlProceso, requestOptions)
            break;
          case "configuracion":
            res = await fetch(state.urlConfiguracion, requestOptions)
            break;
          case "materia_prima":
            res = await fetch(state.urlMateria_prima, requestOptions)
            break;
          case "scrap":
            res = await fetch(state.scrap, requestOptions)
            break;
          case "producto_terminado":
            res = await fetch(state.urlProducto_terminado, requestOptions)
            break;
          case "registro":
            res = await fetch(state.urlRegistro, requestOptions)
            break;
          case "personal":
            res = await fetch(state.urlPersonal, requestOptions)
            break;
          case "usuario":
            res = await fetch(state.urlUsuario, requestOptions)
            break;
          case "informe":
            res = await fetch(state.urlInforme, requestOptions)
            break;

        }

        const data = await res.json()
        console.log(data)
        commit("setmsm", data)

      } catch (error) {
        console.log(error)
      }
    },

    async deleteData({ commit, state }, objeto) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };

        let res = null;
        switch (objeto.pagina) {
          case "color":
            res = await fetch(state.urlColor + "/" + objeto.id_color, requestOptions)
            break;
          case "linea":
            res = await fetch(state.urlLinea + "/" + objeto.id_linea, requestOptions)
            break;
          case "material":
            res = await fetch(state.urlMaterial + "/" + objeto.id_material, requestOptions)
            break;
          case "tipo_material":
            res = await fetch(state.urlTipo_material + "/" + objeto.id_tipo_material, requestOptions)
            break;
          case "tipo_desperdicio":
            res = await fetch(state.urlTipo_desperdicio + "/" + objeto.id_tipo_desperdicio, requestOptions)
            break;
          case "configuracion":
            res = await fetch(state.urlConfiguracion + "/" + objeto.id_configuracion, requestOptions)
            break;
          case "proceso":
            res = await fetch(state.urlProceso + "/" + objeto.id_proceso, requestOptions)
            break;
          case "materia_prima":
            res = await fetch(state.urlMateria_prima + "/" + objeto.id_materia_prima, requestOptions)
            break;
          case "scrap":
            res = await fetch(state.urlScrap + "/" + objeto.id_scrap, requestOptions)
            break;
          case "producto_terminado":
            res = await fetch(state.urlProducto_terminado + "/" + objeto.id_producto_terminado, requestOptions)
            break;
          case "informe":
            res = await fetch(state.urlInforme + "/" + objeto.id_informe, requestOptions)
            break;
          case "personal":
            res = await fetch(state.urlPersonal + "/" + objeto.id_personal, requestOptions)
            break;
          case "usuario":
            res = await fetch(state.urlUsuario + "/" + objeto.id_usuario, requestOptions)
            break;
          case "registro":
            res = await fetch(state.urlRegistro + "/" + objeto.id_registro, requestOptions)
            break;

        }

        const data = await res.json()
        commit("setmsm", data)

      } catch (error) {
        console.log(error)
      }
    },

    async putData({ commit, state }, objeto) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", state.token);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

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
          case "tipo_desperdicio":
            urlencoded.append("id_tipo_desperdicio", objeto.id_tipo_desperdicio);
            urlencoded.append("nombre", objeto.nombre.toUpperCase());
            break;
          case "configuracion":
            urlencoded.append("id_configuracion", objeto.id_configuracion);
            urlencoded.append("kilogramo_diario", objeto.kilogramo_diario);
            urlencoded.append("kilogramo_hora", objeto.kilogramo_hora);
            urlencoded.append("tarifa_kilogramo_producidos", objeto.tarifa_kilogramo_producidos);
            urlencoded.append("estado", objeto.estado);
            urlencoded.append("id_proceso", objeto.id_proceso);
            urlencoded.append("id_material", objeto.id_material);
            urlencoded.append("id_tipo_material", objeto.id_tipo_material);
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
            urlencoded.append("id_configuracion", objeto.id_configuracion);
            urlencoded.append("id_color", objeto.id_color);
            urlencoded.append("id_informe", objeto.id_informe);
            urlencoded.append("peso", objeto.peso);
            break;
          case "producto_terminado":
            urlencoded.append("id_producto_terminado", objeto.id_producto_terminado);
            urlencoded.append("id_informe", objeto.id_informe);
            urlencoded.append("id_color", objeto.id_color);
            urlencoded.append("peso", objeto.peso);
            urlencoded.append("tipo", objeto.tipo);
            break;
          case "scrap":
            urlencoded.append("id_scrap", objeto.id_scrap);
            urlencoded.append("motivo", objeto.motivo);
            urlencoded.append("sacos", objeto.sacos);
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
            urlencoded.append("fecha_creacion", objeto.fecha_creacion);
            urlencoded.append("pass", objeto.pass);
            urlencoded.append("padlock", objeto.padlock);
            urlencoded.append("keylock", objeto.keylock);
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
            urlencoded.append("id_material", objeto.id_material);
            urlencoded.append("id_tipo_material", objeto.id_tipo_material);
            break;

        }

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        let res = null;
        switch (objeto.pagina) {
          case "color":
            res = await fetch(state.urlColor + "/" + objeto.id_color, requestOptions)
            break;
          case "linea":
            res = await fetch(state.urlLinea + "/" + objeto.id_linea, requestOptions)
            break;
          case "material":
            res = await fetch(state.urlMaterial + "/" + objeto.id_material, requestOptions)
            break;
          case "tipo_material":
            res = await fetch(state.urlTipo_material + "/" + objeto.id_tipo_material, requestOptions)
            break;
          case "tipo_desperdicio":
            res = await fetch(state.urlTipo_desperdicio + "/" + objeto.id_tipo_desperdicio, requestOptions)
            break;
          case "proceso":
            res = await fetch(state.urlProceso + "/" + objeto.id_proceso, requestOptions)
            break;
          case "configuracion":
            res = await fetch(state.urlConfiguracion + "/" + objeto.id_configuracion, requestOptions)
            break;
          case "materia_prima":
            res = await fetch(state.urlMateria_prima + "/" + objeto.id_materia_prima, requestOptions)
            break;
          case "scrap":
            res = await fetch(state.urlScrap + "/" + objeto.id_scrap, requestOptions)
            break;
          case "producto_terminado":
            res = await fetch(state.urlProducto_terminado + "/" + objeto.id_producto_terminado, requestOptions)
            break;
          case "registro":
            res = await fetch(state.urlRegistro + "/" + objeto.id_registro, requestOptions)
            break;
          case "personal":
            res = await fetch(state.urlPersonal + "/" + objeto.id_personal, requestOptions)
            break;
          case "usuario":
            res = await fetch(state.urlUsuario + "/" + objeto.id_usuario, requestOptions)
            break;
          case "informe":
            res = await fetch(state.urlInforme + "/" + objeto.id_informe, requestOptions)
            break;
        }

        const data = await res.json();
        commit("setmsm", data)

      } catch (error) {
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
