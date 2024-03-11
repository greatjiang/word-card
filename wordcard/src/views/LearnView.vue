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
        <template v-for="(item, index) in wordList" :key="item + index">
          <li v-if="index === curWordIndex">
            <div @click="check(index)" v-if="!checkFlag">{{ item.word }}</div>
            <div class="word-definition" @click="check(index)" v-else>
              {{ decodeURIComponent(item.phonetic) }}
              <br />
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
  background: #9bd08f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.card-wrap {
  width: 320px;
  height: 180px;
  background: hsl(48, 82%, 87%);
  position: relative;

  ul {
    width: 100%;
    height: 100%;
    // overflow: hidden;

    li {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #dfd1d1;

      div {
        // width: 160px;
        // height: 90px;
        // line-height: 90px;
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        color: black;

        &.word-definition {
          line-height: 30px;
          font-size: 20px;
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
    background-color: #6a9fa5;
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
  background: #76abae;
  color: #31363f;
  top: 0;
  left: 0;
  border: 0;
}
</style>
