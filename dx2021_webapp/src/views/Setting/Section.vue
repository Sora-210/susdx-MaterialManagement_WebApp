<template>
  <div>
    <h1>推論区画設定</h1>
    <div
      id="canvasArea"
      style="width: 70%; position: relative; overflow: hidden"
    >
      <!-- 画像Canvas -->
      <canvas
        id="imageCanvas"
        style="
          top: 0px;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          position: absolute;
          width: 100%;
          height: 100%;
        "
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionSetting',
}
</script>
