<template>
  <div class="row g-3">
    <div class="col-4">
      <input
        type="text"
        class="form-control"
        placeholder="Nombres"
        aria-label="Nombres"
        v-model="nombre"
      />
    </div>
    <div class="col-4">
      <input
        type="text"
        class="form-control"
        placeholder="Apellidos"
        aria-label="Apellidos"
        v-model="apellido"
      />
    </div>
    <div class="col-4">
      <input
        type="number"
        class="form-control"
        placeholder="Cedula"
        aria-label="Cedula"
        v-model="cedula"
      />
    </div>
    <div class="col-9">
      <label for=""></label>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Usuario"
          aria-label="Usuario"
          v-model="correo"
          aria-describedby="basic-addon2"
        />
        <span class="input-group-text" id="basic-addon2">@novared.com.ec</span>
      </div>
    </div>
    <div class="col-3">
      <label for="estado" class="form-label">Estado</label>
      <select id="estado" class="form-select" v-model="activo">
        <option v-bind:value="1" selected>Activo</option>
        <option v-bind:value="0">Inactivo</option>
      </select>
    </div>
    <div class="col-12" v-if="!cambioEditar">
      <div class="form-check form-switch mt-2">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="modificarPassword"
          @change="modificarPass"
        />
        <label class="form-check-label" for="flexSwitchCheckChecked"
          >Modificar contraseña</label
        >
      </div>
    </div>
    <div class="col-6" v-if="cambio">
      <input
        type="password"
        class="form-control"
        placeholder="Contraseña"
        aria-label="Contraseña"
        id="contraseña"
        v-model="contraseña"
      />
    </div>

    <div class="col-6" v-if="cambio">
      <input
        type="password"
        class="form-control"
        placeholder="Repita la Contraseña"
        aria-label="Repita la Contraseña"
        v-model="contraseña2"
        id="contraseña2"
      />
    </div>

    <div class="col-4" v-if="cambio">
      <div class="form-check form-switch mt-2">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          @change="cambiarType"
        />
        <label class="form-check-label" for="flexSwitchCheckChecked"
          >Ver Contraseña</label
        >
      </div>
    </div>
    <div class="col-5 mt-4" v-if="cambio">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          :checked="false"
          v-model="generarPass"
          @change="generarPass1"
        />
        <label class="form-check-label" for="flexCheckDefault">
          {{ textpass }}
        </label>
      </div>
    </div>
    <div class="col-12">
      <div class="alert alert-danger" v-if="IgualarContraseña" role="alert">
        Contraseñas no coincide
      </div>
    </div>

    <div class="col-12" v-if="!cambioEditar">
      <div class="alert alert-info" role="alert">
        <p>Candado: {{ candado }}</p>
        <p>Llave: {{ llave }}</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col mt-3">
      <button class="btn btn-primary" @click="enviar">
        Aplicar
      </button>
      <button class="btn btn-danger ms-3" @click="cerrar">Cancelar</button>
    </div>
  </div>
</template>
<style scoped>
.alert-info p {
  font-size: 11px;
}
</style>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const nombre = ref("");
    const apellido = ref("");
    const cedula = ref("");
    const correo = ref("");
    const activo = ref("");
    const contraseña = ref("");
    const contraseña2 = ref("");
    const candado = ref("");
    const llave = ref("");
    const generarPass = ref("");
    const textpass = ref("");
    const cambio = ref(false);

    const cerrar = () => {
      store.state.formulario = false;
      store.state.editar = false;
      nombre.value = "";
      apellido.value = "";
      cedula.value = "";
      activo.value = "";
      correo.value = "";
      contraseña.value = "";
      contraseña2.value = "";
      candado.value = "";
      llave.value = "";
    };

    const inicio = () => {
      if (store.state.editar) {
        if (
          store.state.objetoEditar != null ||
          store.state.objetoEditar != undefined ||
          store.state.objetoEditar != ""
        ) {
          let email_analizado = /^([^]+)@(\w+).(\w+).(\w+)$/.exec(store.state.objetoEditar?.correo);
          let [,nombrec,servidor,dominio,] = email_analizado;
          cambio.value = false;
          textpass.value = "Regenerar contraseña";
          nombre.value = store.state.objetoEditar.nombre;
          apellido.value = store.state.objetoEditar.apellido;
          cedula.value = store.state.objetoEditar.cedula;
          activo.value = store.state.objetoEditar.activo;
          correo.value = nombrec;
          candado.value = store.state.objetoEditar.padlock;
          contraseña.value = store.state.objetoEditar.pass;
          contraseña2.value = store.state.objetoEditar.pass;
          llave.value = store.state.objetoEditar.keylock;
          activo.value = store.state.objetoEditar.activo;
        } else {
          store.state.formulario = false;
        }
      } else {
        cambio.value = true;
        textpass.value = "Autogenerar contraseña";
        nombre.value = "";
        apellido.value = "";
        cedula.value = "";
        activo.value = "";
        correo.value = "";
        contraseña.value = "";
        contraseña2.value = "";
        candado.value = "";
        llave.value = "";
      }
    };
    inicio();

    const cambiarType = () => {
      let checkwstich = document.getElementById("flexSwitchCheckChecked");
      let inputPass = document.getElementById("contraseña");
      let inputPass2 = document.getElementById("contraseña2");
      if (checkwstich.checked == true) {
        inputPass.type = "text";
        inputPass2.type = "text";
      } else {
        inputPass.type = "password";
        inputPass2.type = "password";
      }
    };

    const modificarPass = () => {
      let modiPass = document.getElementById("modificarPassword");
      if (modiPass.checked == true) {
        contraseña.value = "";
        contraseña2.value = "";
        cambio.value = true;
      } else {
        contraseña.value = store.state.objetoEditar.pass;
        contraseña2.value = store.state.objetoEditar.pass;
        cambio.value = false;
      }
    };

    const generarPass1 = computed(() => {
      if (generarPass.value) {
        contraseña2.value = "";
        contraseña.value = "";
        let abecedario = [
          "A",
          "a",
          "B",
          "b",
          "C",
          "c",
          "D",
          "d",
          "E",
          "e",
          "F",
          "f",
          "G",
          "g",
          "H",
          "h",
          "I",
          "i",
          "J",
          "j",
          "K",
          "k",
          "L",
          "l",
          "M",
          "m",
          "N",
          "n",
          "O",
          "o",
          "P",
          "p",
          "Q",
          "q",
          "R",
          "r",
        ];
        let numero = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var k = 0; k < 5; k++) {
          let indiceAbecedario =
            Math.floor(Math.random() * (abecedario.length - 1)) + 1;
          let indiceNumero =
            Math.floor(Math.random() * (numero.length - 1)) + 1;
          contraseña.value += abecedario[indiceAbecedario];
          contraseña.value += numero[indiceNumero];
        }
        contraseña2.value = contraseña.value;
      } else {
        if (store.state.editar) {
          contraseña.value = store.state.objetoEditar.pass;
          contraseña2.value = store.state.objetoEditar.pass;
        } else {
          contraseña.value = "";
          contraseña2.value = "";
        }
      }
    });

    const IgualarContraseña = computed(() => {
      if (contraseña.value.length != 0 || contraseña2.value.length != 0) {
        if (
          contraseña.value.length == contraseña2.value.length &&
          contraseña.value == contraseña2.value
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

    const enviar = () => {
      //POST
      if (
        nombre.value != "" &&
        apellido.value != "" &&
        cedula.value != "" &&
        activo.value != "" &&
        correo.value != "" &&
        contraseña.value != "" &&
        contraseña2.value != "" &&
        contraseña.value == contraseña2.value
      ) {
        if (!store.state.editar) {
          store.state.loading = true;
          let obj = {
            nombre: nombre.value,
            apellido: apellido.value,
            cedula: cedula.value,
            correo: correo.value + "@novared.com.ec",
            pass: contraseña.value,
            activo: activo.value,
            pagina: "usuario",
          };
          
          store.dispatch("postData", obj);
          //store.dispatch("fetchData", "scrap");
          cerrar();

          if (store.state.msm?.status == 404) {
            swal({
              title: store.state.msm?.detalle,
              icon: "warning",
            });
          }

          //PUT
        } else {
          store.state.loading = true;
          let obj = {
            id_usuario: store.state.objetoEditar.id_usuario,
            nombre: nombre.value,
            apellido: apellido.value,
            cedula: cedula.value,
            correo: correo.value + "@novared.com.ec",
            pass: contraseña.value,
            activo: activo.value,
            pagina: "usuario",
          };
          store.dispatch("putData", obj);
          cerrar();

          if (store.state.msm?.status == 404) {
            swal({
              title: store.state.msm?.detalle,
              icon: "warning",
            });
          }

        }
      } else {
        swal({
          title: "Necesito los datos",
          text: "Llena los campos requeridos",
          icon: "warning",
        });
      }
    };

    const cambioEditar = computed(() => {
      return !store.state.editar;
    });

    return {
      nombre,
      apellido,
      cedula,
      correo,
      activo,
      contraseña,
      contraseña2,
      candado,
      llave,
      cerrar,
      cambioEditar,
      enviar,
      IgualarContraseña,
      generarPass1,
      generarPass,
      textpass,
      cambiarType,
      cambio,
      modificarPass,
    };
  },
};
</script>
