<template>
  <div class="espacioArriba"></div>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mb-3">
        <img class="imagensesion" src="@/assets/iniciosesion.png" alt="" />
      </div>
      <div class="col-12 mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Usuario"
          v-model="user"
          @keyup.enter="focusPass"
        />
      </div>
      <div class="col-12 mb-3">
        <input
          type="password"
          class="form-control"
          placeholder="Contraseña"
          v-model="password"
          id="password"
          @keyup.enter="validateCredential"
        />
      </div>
      <div class="col-12 mb-3"></div>
      <div class="col-12 mb-3">
        <button
          type="button"
          class="btn btn-success"
          @click="validateCredential"
        >
          Iniciar Sesion
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.row {
  border: 1px solid rgb(157, 157, 157);
  border-radius: 10px;
  width: 25%;
  overflow: hidden;
}
.container-fluid {
  display: flex;
  align-items: center;
  justify-content: center;
}
.espacioArriba {
  height: 150px;
}
.imagensesion {
  padding: 10px;
  width: 250px;
}
</style>
<script>
// @ is an alias to /src
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import swal from "sweetalert";
import VueCookies from "vue-cookies";

export default {
  name: "Home",
  components: {},
  setup() {
    onMounted(() => {
      sesion();
    });

    //importaciones
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    //v-model the form
    const user = ref("");
    const password = ref("");
    const data = ref([]);

    //validates that there is a valid token
    const sesion = () => {
      if (VueCookies.get("sesion")) {
        store.state.token = VueCookies.get("sesion");
        router.push("/");
      }
    };
    sesion();

    const validateCredential = async () => {
      var formdata = new FormData();
      let email = user.value + "@novared.com.ec";
      formdata.append("pass", password.value);
      formdata.append("correo", email);
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", store.state.token);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        const res = await fetch(store.state.url + "/login", requestOptions);
        const da = await res.json();
        data.value = da;
      } catch (error) {
        console.log(error);
      }

      if (data?.value.status == 200) {
        if (data.value.detalle.activo == "1") {
          const part1 = btoa(
            data.value.detalle.padlock + ":" + data.value.detalle.keylock
          );
          const token = "Basic " + part1;
          VueCookies.set("sesion", token, "8h");
          store.state.nombreUsuario = data.value.detalle.nombre
          sesion();
        }else{
          user.value = "";
          password.value = "";
          swal("Usuario y/o contraseña incorrectos", "", "warning");
        }
      } else {
        user.value = "";
        password.value = "";
        swal(data.value.detalle, "", "warning");
      }
    };

    const focusPass = () => {
      document.getElementById("password").focus();
    };

    return { sesion, validateCredential, focusPass, user, password };
  },
};
</script>
