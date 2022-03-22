<template>
  <CCard :color="StatusData.color">
    <CCardBody class="ma-6">
      <CCardTitle class="Text Title mb-2">{{ StatusData.status }}</CCardTitle>
      <CCardSubtitle class="Text">{{ spaceName }}</CCardSubtitle>
    </CCardBody>
  </CCard>
</template>

<style scoped>
.Title {
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
}
.Text {
  color: #fff;
}
</style>

<script>
export default {
  name: 'StatusCard',
  props: {
    status: {
      type: String,
      default: 'many',
    },
    spaceName: {
      type: String,
      default: 'Camera 0 - No.0',
    },
  },
  setup(props) {
    const DefaultList = {
      many: {
        color: 'success',
        status: '多い',
      },
      few: {
        color: 'warning',
        status: '少ない',
      },
      none: {
        color: 'danger',
        status: '無し',
      },
      cover: {
        color: 'secondary',
        status: 'カバー(判定不可)',
      },
    }
    const StatusData = DefaultList[props.status]
    return {
      StatusData,
    }
  },
}
</script>
