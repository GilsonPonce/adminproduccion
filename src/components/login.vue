<template>
  <div class="espacioArriba"></div>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mb-3"></div>
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
  border: 2px solid rgb(157, 157, 157);
  width: 25%;
}
.container-fluid {
  display: flex;
  align-items: center;
  justify-content: center;
}
.espacioArriba {
  height: 150px;
}
</style>
<script>
// @ is an alias to /src
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import swal from "sweetalert";


export default {
  name: "Home",
  components: {
  },
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
      if (localStorage.sesion) {
        store.state.token = localStorage.getItem("sesion");
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

        const res = await fetch(store.state.urlLogin, requestOptions);
        const da = await res.json();
        data.value = da;
      } catch (error) {
        console.log(error);
      }


      if (data.value.status == 200) {
        const part1 = btoa(data.value.detalle.padlock+":"+data.value.detalle.keylock);
        

        const token = "Basic " + part1

        localStorage.setItem("sesion", token);

        sesion();
      } else {
        user.value = "";
        password.value = "";
        swal(data.value.detalle, "", "warning");
      }
    };

    const focusPass = () =>{
        document.getElementById("password").focus();
    }

    return { sesion, validateCredential,focusPass, user, password };
  },
};
</script>
