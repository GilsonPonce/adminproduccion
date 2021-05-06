<template>
<div v-if="navegacion" class="mb-4">
 <Nav />
</div>
<div v-if="!navegacion">
<Login />
</div>
<router-view/>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import Nav from "@/components/nav.vue";
import Login from "@/components/login.vue";
import { computed } from 'vue';
import { useStore } from "vuex";
export default {
  components: {
    Nav,Login
  },
  setup(){
    const store = useStore();
    

    const navegacion = computed(()=>{
      if(store.state.token != null){
        return true
      }else{
        return false
      }
    })

    
    return{navegacion}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
