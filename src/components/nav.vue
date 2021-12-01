<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">NOVARED</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/informe">Informenes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/personal">Personal</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Configuraciones
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" to="/color"
                  >Colores</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/tipo_desperdicio"
                  >Tipo de Desperdicios</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/linea"
                  >Lineas</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/proceso"
                  >Procesos</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/material"
                  >Materiales</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/tipo_material"
                  >Tipo de materiales</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/tarifario"
                  >Tarifarios</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Seguridad
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li>
                <router-link class="dropdown-item" to="/usuario"
                  >Registrar Usuario</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/perfil"
                  >Perfil</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" @click="logout" href="#"
                  >Cerrar Sesion</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="nombreUsuario">{{getNombreUsuario}}</div>
    </div>
  </nav>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import VueCookies from 'vue-cookies';
import { computed } from '@vue/runtime-core';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const logout = () => {
      store.state.token = null;
      VueCookies.remove("sesion")
      router.push("/");
    };
    const getNombreUsuario = computed(()=>{
      return store.state.nombreUsuario
    })
    return{logout,getNombreUsuario}
  },
};
</script>

<style scoped>
.nombreUsuario{
  color: white;
}
</style>