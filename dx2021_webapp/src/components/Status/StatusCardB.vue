<template>
  <div id="card" @click="click">
    <div id="camera_name">
      {{ cameraName }}
    </div>
    <transition name="fade" mode="out-in" appear>
      <div class="loader-container" v-if="flag" key="loader">
        <div class="loader"></div>
      </div>
      <div class="container" v-else key="main">
        <div id="camera_status_list">
          <div class="color_many" :style="'flex:' + manyPercent + '%'"></div>
          <div class="color_few" :style="'flex:' + fewPercent + '%'"></div>
          <div class="color_none" :style="'flex:' + nonePercent + '%'"></div>
          <div class="color_cover" :style="'flex:' + coverPercent + '%'"></div>
        </div>
        <div id="camera_status">
          <div id="camera_status_title">
            <div class="color_many">
              <span>多い</span>
            </div>
            <div class="color_few">
              <span>少ない</span>
            </div>
            <div class="color_none">
              <span>無し</span>
            </div>
            <div class="color_cover">
              <span>カバー(判定不可)</span>
            </div>
          </div>
          <div id="camera_status_detail">
            <div>
              <span>{{ manySection }} 区画</span>
            </div>
            <div>
              <span>{{ fewSection }} 区画</span>
            </div>
            <div>
              <span>{{ noneSection }} 区画</span>
            </div>
            <div>
              <span>{{ coverSection }} 区画</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#card {
  margin: 30px 0;
  padding: 15px 10px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  animation: ease 1s fade-in;
  transition: box-shadow 0.5s ease;
  cursor: pointer;
}
#card:hover {
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.5s ease;
}

#camera_status_list {
  margin: 20px 0;
  display: flex;
}
#camera_status_list div {
  width: 100%;
  height: 7px;
  transition: width 1s ease;
}
#camera_status_list .color_many {
  background-color: #2cb4ad;
}
#camera_status_list .color_few {
  background-color: #ffdc00;
}
#camera_status_list .color_none {
  background-color: #ef857d;
}
#camera_status_list .color_cover {
  background-color: #736d71;
}

#camera_status {
  display: flex;
  justify-content: space-evenly;
  font-size: 1.2em;
}
#camera_status .color_many span {
  padding-left: 5px;
  border-left: solid 3px #2cb4ad;
}
#camera_status .color_few span {
  padding-left: 5px;
  border-left: solid 3px #ffdc00;
}
#camera_status .color_none span {
  padding-left: 5px;
  border-left: solid 3px #ef857d;
}
#camera_status .color_cover span {
  padding-left: 5px;
  border-left: solid 3px #736d71;
}
#camera_status_detail {
  padding-left: 10px;
}

#camera_name {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  font-size: 125%;
  font-weight: bold;
}

.loader-container {
  margin: 30px auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
}
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 4px;
  border-color: #000000 #00000010;
  position: relative;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
import { ref } from 'vue'
import store from '@/store/index'
import api from '@/api'

export default {
  name: 'StatusCardB',
  props: {
    projectId: {
      Type: String,
    },
    cameraName: {
      Type: String,
    },
    cameraId: {
      Type: String,
    },
  },
  setup() {
    const flag = ref(true)
    const allSection = ref(0)
    const manySection = ref(0)
    const fewSection = ref(0)
    const noneSection = ref(0)
    const coverSection = ref(0)
    return {
      flag,
      allSection,
      manySection,
      fewSection,
      noneSection,
      coverSection,
    }
  },
  async mounted() {
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    api
      .get(
        `https://api.sus-dx.sora210.net/${this.projectId}/inference/${this.cameraId}/latest`,
        option,
      )
      .then((res) => {
        let statusJson = res.data.data
        statusJson.forEach((value) => {
          value[1].forEach((value2) => {
            this.allSection++
            if (value2.status === 'many') {
              this.manySection++
            } else if (value2.status === 'few') {
              this.fewSection++
            } else if (value2.status === 'none') {
              this.noneSection++
            } else if (value2.status === 'cover') {
              this.coverSection++
            }
          })
        })
        this.flag = false
      })
  },
  methods: {
    click: function () {
      this.$router.push(`/inference/${this.cameraId}`)
    },
  },
  computed: {
    manyPercent: function () {
      return Math.floor((this.manySection / this.allSection) * 1000) / 10
    },
    fewPercent: function () {
      return Math.floor((this.fewSection / this.allSection) * 1000) / 10
    },
    nonePercent: function () {
      return Math.floor((this.noneSection / this.allSection) * 1000) / 10
    },
    coverPercent: function () {
      return Math.floor((this.coverSection / this.allSection) * 1000) / 10
    },
  },
}
</script>
