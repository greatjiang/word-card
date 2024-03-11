<template>
  <div>
    <div>
      <label for="word">单词</label>
      <input type="text" name="word" id="word" v-model="word" />
    </div>
    <div>
      <label for="phonetic">音标</label>
      <textarea id="phonetic" name="phonetic" v-model="phonetic" rows="5" cols="33"></textarea>
    </div>
    <div>
      <label for="meaning">词义</label>
      <textarea id="meaning" name="meaning" v-model="meaning" rows="5" cols="33"></textarea>
    </div>
    <button @click="addWord">添加</button>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
const { proxy } = getCurrentInstance()

const word = ref('')
const phonetic = ref('')
const meaning = ref('')

async function addWord() {
  if (word.value == '' || phonetic.value == '' || meaning.value == '') {
    return
  }
  console.log(1)
  const { data } = await proxy.$fetch('/api/addWord', {
    method: 'POST',
    data: {
      word: encodeURIComponent(word.value),
      phonetic: encodeURIComponent(phonetic.value),
      meaning: encodeURIComponent(meaning.value)
    }
  })

  console.log(data)
}
</script>

<style>
</style>