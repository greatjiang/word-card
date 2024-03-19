<template>
  <div>
    <!-- 搜索 -->
    <!-- 新增 -->
    <input type="text" />
    <button>搜索</button>
    <button>新增</button>
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
          <td @click="operate(index)">修改</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const router = useRouter()

let wordsList = ref([])

async function getList() {
  const { data, code } = await proxy.$fetch('/api/list')

  if (code === 1) {
    wordsList.value = data.list
  }
}

onMounted(() => {
  getList()
})

function operate(index) {
  alert(index)
}

function goBack() {
  router.go(-1)
}
</script>

<style scoped lang="scss">
</style>