<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { proxy } = getCurrentInstance()

onMounted(() => {
  getList()
})

let wordList = ref([])

let curWordIndex = ref(0)

let checkFlag = ref(false)

function check(index) {
  // alert(index + '我被点了')
  curWordIndex.value = index
  checkFlag.value = !checkFlag.value
}

function turnPage(type) {
  if (!type && curWordIndex.value === 0) return

  if (type && curWordIndex.value === wordList.value.length - 1) return

  checkFlag.value = false

  if (!type) {
    curWordIndex.value--
  } else {
    curWordIndex.value++
  }
}

async function getList() {
  const { data } = await proxy.$fetch('/api/list')

  console.log(data)
  wordList.value = data.list
}

function addPage() {
  router.push(`/add`)
}
</script>

<template>
  <section class="main">
    <button class="add-new" @click="addPage">新增单词</button>
    <div class="card-wrap">
      <ul>
        <template v-for="(item, index) in wordList">
          <li v-if="index === curWordIndex" :key="item + index">
            <div @click="check(index)" v-if="!checkFlag">
              <div class="word-item">
                {{ item.word }}
              </div>
              <div class="phonetic-item">
                {{ decodeURIComponent(item.phonetic) }}
              </div>
            </div>
            <div class="word-definition" @click="check(index)" v-else>
              {{ decodeURIComponent(item.meaning) }}
            </div>
          </li>
        </template>
      </ul>

      <div class="page-turn">
        <div @click="turnPage(0)" :class="{ grayed: curWordIndex === 0 }">上一个</div>
        <div @click="turnPage(1)" :class="{ grayed: curWordIndex === wordList.length - 1 }">
          下一个
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
ul,
li {
  list-style: none;
}
.main {
  width: 100vw;
  height: 100vh;
  // background: #9bd08f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.card-wrap {
  width: 320px;
  height: 180px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;

  ul {
    width: 100%;
    height: 100%;

    li {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        color: #4a5b66;

        &.word-definition {
          line-height: 22px;
          font-size: 20px;
          padding: 0 2px;
        }
      }
    }
  }
}

.page-turn {
  display: flex;
  justify-content: space-around;
  div {
    width: 80px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #4a5b66;
    color: aliceblue;
    font-size: 16px;
    &.grayed {
      opacity: 0.5;
    }
  }
}

.add-new {
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

div.phonetic-item {
  font-size: 20px !important;
}
</style>
