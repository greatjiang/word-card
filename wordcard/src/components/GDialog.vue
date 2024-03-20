<template>
  <div v-if="visible" class="dialog">
    <div class="dialog-content">
      <h2>{{ title }}</h2>
      <!-- <p>{{ content }}</p> -->
      <slot></slot>
      <button @click="confirm">{{ confirmText }}</button>
      <button @click="cancel">{{ cancelText }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  setup(props, { emit }) {
    const confirm = () => {
      emit('confirm')
    }

    const cancel = () => {
      emit('cancel')
    }

    return { confirm, cancel }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.dialog-content h2 {
  margin-top: 0;
}

.dialog-content p {
  margin-bottom: 20px;
}

.dialog-content button {
  /* margin-right: 10px; */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
