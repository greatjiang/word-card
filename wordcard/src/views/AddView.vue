<template>
  <div class="add-container">
    <button class="add-back" @click="goBack">返回</button>
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
    <div class="add-item">
      <label for="meaning">例句</label>
      <textarea id="meaning" name="meaning" v-model="meaning" rows="5" cols="33"></textarea>
    </div>
    <div class="add-item">
      <label for="add-button"></label>
      <button id="add-button" class="add-word" @click="addWord">添加</button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const router = useRouter()

const word = ref('')
const phonetic = ref('')
const meaning = ref('')

async function addWord() {
  if (word.value == '' || phonetic.value == '' || meaning.value == '') {
    alert('请完成填写项~')
    return
  }

  const { code } = await proxy.$fetch('/api/addWord', {
    method: 'POST',
    data: {
      word: encodeURIComponent(word.value.trim()),
      phonetic: encodeURIComponent(phonetic.value.trim()),
      meaning: encodeURIComponent(meaning.value.trim())
    }
  })

  console.log(code)
}

function goBack() {
  router.go(-1)
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

.add-back {
  position: absolute;
  width: 160px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 20px;
  border-radius: 5px;
  background: #fff;
  color: #4a5b66;
  top: 0;
  left: 0;
  border: 0;
}
</style>