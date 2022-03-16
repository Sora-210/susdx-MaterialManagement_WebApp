<template>
  <div>
    <h1>現在時刻: {{ new Date().toTimeString() }}</h1>
    <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
      <CCol class="mt-5">
        <camera-card />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CameraCard from '@/components/CameraCard.vue'

export default {
  name: 'CameraNow',
  components: {
    CameraCard,
  },
}
</script>
