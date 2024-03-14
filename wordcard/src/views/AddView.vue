<template>
  <div class="add-container">
    <div class="add-item">
      <label for="word">单词</label>
      <input autocomplete="off" type="text" name="word" id="word" v-model="word" />
    </div>
    <div class="add-item">
      <label for="phonetic">音标</label>
      <textarea id="phonetic" name="phonetic" v-model="phonetic" rows="5" cols="33"></textarea>
    </div>
    <div class="add-item">
      <label for="meaning">词义</label>
      <textarea id="meaning" name="meaning" v-model="meaning" rows="5" cols="33"></textarea>
    </div>
    <button class="add-word" @click="addWord">添加</button>
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
    alert('请完成填写项~')
    return
  }

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

<style lang="scss" scoped>
.add-container {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  // background-color: #f8e496;
  background-color: #fff;
  border-radius: 5px;
}
.add-item {
  display: flex;
  margin-bottom: 20px;

  label {
    display: inline-block;
    width: 50px;
    font-size: 18px;
    font-weight: 400;
    // color: #4a5b66;
  }

  input,
  textarea {
    background-color: #f5f8fa;
    width: 100%;
    line-height: 30px;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #4a5b66;
    padding: 0 5px;
  }

  input {
    height: 40px;
  }

  textarea {
    resize: none;
  }
}

.add-word {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border: none;
  background-color: #4a5b66;
  color: #f5f7fa;
  border-radius: 5px;
}
</style>