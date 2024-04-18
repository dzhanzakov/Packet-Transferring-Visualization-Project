<template>
  <div class="card" :style="{ borderColor: borderColor}">
    <header v-if="header" style="width: 100%; background-color:#dcdcdc; padding: 30px;">
      <h2 class="header-title">{{ headerTitle }}</h2>
    </header>
      <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="card-image">
      <div class="card-content">
        <slot></slot>
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>
        <button v-if="button" class="card-button" @click="$emit('button-click')">{{ buttonText }}</button>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    button: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Button'
    },
    imageSrc: {
      type: String,
      default: null
    },
    imageAlt: {
      type: String,
      default: null
    },
    borderColor: {
      type: String,
      default: '#e0e0e0'
    },
    header: {
      type: Boolean,
      default: false
    },
    headerTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.card {
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
    0px 4px 8px rgba(0, 0, 0, 0.1),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.card-image {
  width: 100%;
  height: auto;
}

.card-content {
  padding: 20px;
}

.card-title {
  margin-top: 0;
  font-size: 1.5rem;
}

.card-description {
  margin-bottom: 15px;
}

.card-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card-button:hover {
  background-color: #0056b3;
}
</style>
