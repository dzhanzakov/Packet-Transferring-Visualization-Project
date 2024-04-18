<template>
  <div v-if="status.visible" class="message-container" :class="[status.type === 'success' ? 'success' : 'error']">
    <span style="text-align: center; font-size: 24px; font-weight: bold;">
      {{ status.type === 'success' ? 'Success' : 'Error' }}
    </span>
    {{ status.message }}
    <button @click="hideMessage">Close</button>
  </div>
</template>

<script setup>
import { status } from '../values/values';

function hideMessage(){
  status.value.visible = false
}
</script>

<style scoped>
.message-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 20px;
  width: 400px;
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}


.success {
  background-color: lightgreen;
  color: green;
}
.error {
  background-color: rgb(194, 190, 190);
  color: red;
}
button {
  background: none;
  cursor: pointer;
}
</style>
