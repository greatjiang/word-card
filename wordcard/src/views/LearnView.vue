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
  const { data, code } = await proxy.$fetch('/api/list')

  if (code === 1) {
    wordList.value = data.list
  }
}

function addPage() {
  router.push(`/add`)
}

let fullFlag = ref(false)
function radicalTrigger() {
  // console.log(fullFlag.value)
  fullFlag.value = !fullFlag.value
}
</script>

<template>
  <section class="main">
    <button class="add-new" @click="addPage">新增单词</button>
    <div class="card-wrap">
      <ul>
        <template v-for="(item, index) in wordList">
          <li v-if="index === curWordIndex" :key="item + index">
            <div class="word-icon" v-if="checkFlag">
              <!-- <span @mouseover="radicalTrigger" @mouseleave="radicalTrigger">词根</span> -->
              <span @mouseover="radicalTrigger" @mouseleave="radicalTrigger">例句</span>
              <!-- <span @mouseover="radicalTrigger" @mouseleave="radicalTrigger">联想</span> -->
            </div>
            <div @click="check(index)" v-if="!checkFlag">
              <div>
                {{ item.word }}
              </div>
              <div>
                {{ decodeURIComponent(item.phonetic) }}
              </div>
            </div>
            <div class="word-definition" @click="check(index)" v-else>
              {{ decodeURIComponent(item.meaning) }}

              <div class="full-meaning" v-show="fullFlag">
                {{ decodeURIComponent(item.example) }}
              </div>
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
      position: relative;

      div {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #4a5b66;

        &.word-definition {
          max-height: 100px;
          line-height: 26px;
          font-size: 20px;
          padding: 0 10px;
          overflow-y: scroll;
          box-sizing: border-box;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 4; /* 限制行数 */
          // -webkit-box-orient: vertical;
        }
        .full-meaning {
          position: absolute;
          width: 320px;
          top: 0;
          left: 330px;
          line-height: 26px;
          font-size: 20px;
          background-color: #fff;
          border-radius: 5px;
          padding: 5px;
        }
      }

      div.word-icon {
        position: absolute;
        top: 0;
        right: 10px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: right;
        align-items: center;

        span {
          font-size: 12px;
          border-radius: 2px;
          // border: 1px solid #448687;
          background-color: #448687;
          margin: 0 2px;
          padding: 0 2px;
          box-sizing: border-box;
          cursor: pointer;
          color: #fff;
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
    cursor: pointer;
    user-select: none;

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
</style>
