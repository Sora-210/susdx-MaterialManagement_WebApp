<template>
  <div>
    <h1>現在時刻: {{ new Date().toTimeString() }}</h1>
    <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
      <CCol class="mt-5" v-for="metaData in metaDatas" :key="metaData.index">
        <camera-card
          :cameraName="metaData.cameraName"
          :imageUrl="metaData.imageUrl"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CameraCard from '@/components/CameraCard.vue'

import store from '@/store/index'

export default {
  name: 'CameraNow',
  components: {
    CameraCard,
  },
  setup() {
    const metaDatas = [
      {
        cameraName: 'Camera1',
        imageUrl:
          'http://api.sus-dx.sora210.net/cam1?authorization=' +
          store.getters.jwt,
      },
    ]

    return {
      metaDatas,
    }
  },
}
</script>
