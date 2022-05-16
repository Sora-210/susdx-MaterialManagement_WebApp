<template>
  <div>
    <h1>在庫状況詳細 [Camera 1]</h1>
    <div id="canvasWrap">
      <!-- 画像Canvas -->
      <canvas id="canvasImage" class="canvas"></canvas>
    </div>
    <StatusWidgetsNoTitle :datas="list" />
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
import StatusWidgetsNoTitle from '@/components/Status/StatusWidgetsNoTitle.vue'

export default {
  name: 'Inference',
  components: {
    StatusWidgetsNoTitle,
  },
  setup() {
    const list = ref([])
    return {
      list,
    }
  },
  async mounted() {
    //区画?��?報を取?��?
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    const res = await api.get(
      'https://api.sus-dx.sora210.net/testProject/config/1/inference',
      option,
    )
    const resInference = await api.get(
      'https://api.sus-dx.sora210.net/testProject/inference/1/latest',
      option,
    )
    resInference.data.data.forEach((res) => {
      this.list.push(res)
    })
    console.log(this.list)
    // this.list.value = resInference.data.data
    // console.log(this.list.value)

    const color = {
      many: 'rgb(0, 255, 0)',
      few: 'rgb(255, 255, 0)',
      cover: 'rgb(0, 0, 0)',
      none: 'rgb(255, 0, 0)',
    }

    const object_list = res.data.object_list
    //取得した情報を整形
    function dataShaping(lists) {
      const shapedList = []
      lists.forEach((list, index) => {
        const shaped = {}
        shaped.x = list['left-top'].x
        shaped.y = list['left-top'].y
        shaped.w = list['right-bottom'].x - shaped.x
        shaped.h = list['right-bottom'].y - shaped.y
        shaped.color = color[resInference.data.data[0][1][index].status]
        shapedList.push(shaped)
      })

      return shapedList
    }

    //区画?��?報(整形?��?)
    const spaceJson = dataShaping(object_list)

    //全体�??��ブロ?��?クを取?��?
    const wrap = document.getElementById('canvasWrap')

    //画像を準備(最新画像を使用)
    const base_image = new Image()
    base_image.src = `https://api.sus-dx.sora210.net/testProject/image/1/latest?authorization=${this.$store.getters.jwt}`
    //画像描画canvasを準備
    const canvas_1 = document.getElementById('canvasImage')
    const canvas_1_ctx = canvas_1.getContext('2d')

    //区画描画用のcanvasを準備
    for (let i = 0; i < spaceJson.length; i++) {
      //エレメント生?��?
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      //id, class設?��?
      canvas.id = `cnavasSpace-${i}`
      canvas.classList.add('canvas')

      //wrapに追?��?
      wrap.append(canvas)

      //jsonに追?��?
      spaceJson[i].canvas = canvas
      spaceJson[i].ctx = ctx
    }
    console.log(spaceJson)

    function resize() {
      //基本サイズの取�?
      const width = wrap.clientWidth //wrapブロ?��?クの横?��?取�?
      const scale = width / 1920 //FullHDとの比�?倍率
      const height = 1080 * scale //アスペクト比固定での高さ計�?
      wrap.style.height = `${height}px`

      //canvasをリサイズ
      canvas_1.width = width
      canvas_1.height = height
      spaceJson.forEach((space) => {
        space.canvas.width = width
        space.canvas.height = height
      })

      //ベ�??��スとなる画像を描画
      canvas_1_ctx.drawImage(base_image, 0, 0, 1920, 1080, 0, 0, width, height)

      spaceJson.forEach((space) => {
        //図形の?��?種数値計�?&変数準備
        const x = space.x * scale
        const y = space.y * scale
        const w = space.w * scale
        const h = space.h * scale
        const color = space.color

        //図形の設?��?
        space.ctx.strokeStyle = color
        space.ctx.lineWidth = 4

        //図形を描画
        space.ctx.rect(x, y, w, h)
        space.ctx.stroke()
      })
    }

    window.onresize = resize

    base_image.onload = resize
  },
}
</script>
