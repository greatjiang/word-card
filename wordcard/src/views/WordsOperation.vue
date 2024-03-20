<template>
  <div>
    <!-- 搜索 -->
    <!-- 新增 -->
    <input type="text" />
    <button>搜索</button>
    <button @click="addAction">新增</button>
    <button class="add-back" @click="goBack">返回</button>
    <table>
      <thead>
        <tr>
          <th scope="col">单词</th>
          <th scope="col">词义</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in wordsList" :key="index">
          <td>{{ item.word }}</td>
          <td>{{ decodeURIComponent(item.meaning) }}</td>
          <td @click="operate(item)">修改</td>
        </tr>
      </tbody>
    </table>
    <g-dialog :title="'新增单词'" :visible="showAddFlag" @confirm="confirm" @cancel="cancel">
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
        <div class="add-item">
          <label for="example">例句</label>
          <textarea id="example" name="example" v-model="example" rows="5" cols="33"></textarea>
        </div>
      </div>
    </g-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const router = useRouter()

let wordsList = ref([])

let showAddFlag = ref(false)

async function getList() {
  const { data, code } = await proxy.$fetch('/api/list')

  if (code === 1) {
    wordsList.value = data.list
  }
}

onMounted(() => {
  getList()
})

// 单词操作
function operate(item) {
  showAddFlag.value = true

  word.value = item.word
  phonetic.value = decodeURIComponent(item.phonetic)
  meaning.value = decodeURIComponent(item.meaning)
  example.value = decodeURIComponent(item.example)
}

function goBack() {
  router.go(-1)
}

async function confirm() {
  return
  if (word.value == '' || phonetic.value == '' || meaning.value == '' || example.value == '') {
    alert('请完成填写项~')
    return
  }

  const { code } = await proxy.$fetch('/api/addWord', {
    method: 'POST',
    data: {
      word: encodeURIComponent(word.value.trim()),
      phonetic: encodeURIComponent(phonetic.value.trim()),
      meaning: encodeURIComponent(meaning.value.trim()),
      example: encodeURIComponent(example.value.trim())
    }
  })

  console.log(code)
  showAddFlag.value = false
  getList()
}
function cancel() {
  showAddFlag.value = false
}

function addAction() {
  showAddFlag.value = true
  word.value = ''
  phonetic.value = ''
  meaning.value = ''
  example.value = ''
}
//单词项
const word = ref('')
const phonetic = ref('')
const meaning = ref('')
const example = ref('')
</script>


<style scoped lang="scss">
add-container {
  width: 400px;
  margin: 0 auto;
  // margin-top: 100px;
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