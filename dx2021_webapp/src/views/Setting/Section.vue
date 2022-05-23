<template>
  <div>
    <CRow class="justify-content-between" :xs="{ cols: 1 }" :md="{ cols: 2 }">
      <CCol>
        <h1>推論区画設定</h1>
        <h3>[Camera 1]</h3>
      </CCol>
      <CCol class="align-self-center" style="text-align: end">
        <CButton color="success" variant="outline" @click="updateSpace">
          区画追加
        </CButton>
      </CCol>
    </CRow>
    <div id="canvasWrap">
      <!-- 画像Canvas -->
      <canvas id="canvasImage" class="canvas"></canvas>
    </div>
    <div class="tb-wrap my-3">
      <table>
        <tr class="tb-title">
          <th>区画名</th>
          <th>開始位置 x</th>
          <th>開始位置 y</th>
          <th>横幅 w</th>
          <th>縦幅 h</th>
          <th></th>
        </tr>
        <tr class="tb-row" v-for="(config, index) in configJson" :key="index">
          <td>
            No.
            {{ index }}
          </td>
          <td>
            {{ config.x }}
            px
          </td>
          <td>
            {{ config.y }}
            px
          </td>
          <td>
            {{ config.w }}
            px
          </td>
          <td>
            {{ config.h }}
            px
          </td>
          <td>
            <CButton color="warning" variant="outline" @click="updateSpace">
              修正
            </CButton>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
#canvasWrap {
  width: 70%;
  height: 500px;
  position: relative;
  overflow: hidden;
}
@media screen and (max-width: 500px) {
  #canvasWrap {
    width: 100%;
  }
}

.canvas {
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
</style>

<script>
import { ref } from 'vue'
import store from '@/store/index'
import api from '@/api'

export default {
  name: 'SectionSetting',
  setup() {
    const list = ref([])
    const configJson = ref([])
    return {
      list,
      configJson,
    }
  },
  async mounted() {
    //区画情報を取得
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    const res = await api.get(
      'https://api.sus-dx.sora210.net/testProject/config/1/inference',
      option,
    )

    const object_list = res.data.object_list
    //取得した情報を整形
    function dataShaping(lists) {
      const shapedList = []
      lists.forEach((list) => {
        const shaped = {}
        shaped.x = list['left-top'].x
        shaped.y = list['left-top'].y
        shaped.w = list['right-bottom'].x - shaped.x
        shaped.h = list['right-bottom'].y - shaped.y
        shaped.color = 'rgb(0, 255, 0)'
        shapedList.push(shaped)
      })

      return shapedList
    }

    //区画情報(整形済)
    const spaceJson = dataShaping(object_list)
    this.configJson = spaceJson
    //全体のブロックを取得
    const wrap = document.getElementById('canvasWrap')

    //画像を準備(最新画像を使用)
    const base_image = new Image()
    base_image.src = `https://api.sus-dx.sora210.net/testProject/image/1/latest?authorization=${this.$store.getters.jwt}`
    //画像描画canvasを準備
    const canvas_1 = document.getElementById('canvasImage')
    const canvas_1_ctx = canvas_1.getContext('2d')

    //区画描画用のcanvasを準備
    for (let i = 0; i < spaceJson.length; i++) {
      //エレメント生成
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      //id, class設定
      canvas.id = `cnavasSpace-${i}`
      canvas.classList.add('canvas')

      //wrapに追加
      wrap.append(canvas)

      //jsonに追加
      spaceJson[i].canvas = canvas
      spaceJson[i].ctx = ctx
    }
    console.log(spaceJson)

    function resize() {
      //基本サイズの取得
      const width = wrap.clientWidth //wrapブロックの横幅取得
      const scale = width / 1920 //FullHDとの比較倍率
      const height = 1080 * scale //アスペクト比固定での高さ計算
      wrap.style.height = `${height}px`

      //canvasをリサイズ
      canvas_1.width = width
      canvas_1.height = height
      spaceJson.forEach((space) => {
        space.canvas.width = width
        space.canvas.height = height
      })

      //ベースとなる画像を描画
      canvas_1_ctx.drawImage(base_image, 0, 0, 1920, 1080, 0, 0, width, height)

      spaceJson.forEach((space) => {
        //図形の各種数値計算&変数準備
        const x = space.x * scale
        const y = space.y * scale
        const w = space.w * scale
        const h = space.h * scale
        const color = space.color

        //図形の設定
        space.ctx.strokeStyle = color
        space.ctx.lineWidth = 1

        //図形を描画
        space.ctx.rect(x, y, w, h)
        space.ctx.stroke()
      })
    }

    window.onresize = resize

    base_image.onload = resize
  },
  methods: {
    updateSpace: function () {
      alert('この機能は未実装です')
    },
  },
}
</script>

<style scoped>
.tb-wrap {
  width: 100%;
}
table {
  border-bottom: solid 2px #2e58b8;
  width: 100%;
}
@media screen and (max-width: 500px) {
  table {
    width: 450px;
  }
  .tb-wrap {
    overflow-x: scroll;
  }
}

tr {
  height: 4em;
  text-align: center;
}
td,
th {
  vertical-align: middle;
}
.tb-title {
  background-color: #2e58b81a;
  border-top: solid 2px #2e58b8;
  border-bottom: solid 2px #2e58b8;
}
.tb-row {
  display: table-row-group;
}
.tb-row:nth-child(odd) {
  background-color: #e3e3e3;
}
</style>
