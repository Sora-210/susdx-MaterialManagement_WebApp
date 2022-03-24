<template>
  <CCard>
    <CCardHeader><CIcon icon="cil-camera" /> {{ cameraName }} </CCardHeader>
    <CCardBody>
      <CRow>
        <CImage fluid :src="imageUrl" />
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'CameraCard',
  props: {
    cameraName: {
      type: String,
      default: '<Example>',
    },
    imageUrl: {
      type: String,
      default: 'https://api.sus-dx.sora210.net/cam1/example',
    },
  },
}
</script>
