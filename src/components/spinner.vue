<template>
  <div class="contenedor">
    <div class="modelo">
      <div class="d-flex justify-content-center">
        <div
          class="spinner-border text-info"
          style="width: 7rem; height: 7rem;"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.contenedor {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.541);
}
.modelo {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 20px;
  margin: auto 100px;
  position: relative;
  top: 30%;
}
.spinner-border{
  background: white;
  margin: 50px;
}

</style>
