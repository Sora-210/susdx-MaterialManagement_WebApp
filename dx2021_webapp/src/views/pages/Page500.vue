<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">500</h1>
            <h4 class="pt-3">Internal Server Error</h4>
            <p class="text-medium-emphasis float-start">
              サーバーでエラー発生しました
            </p>
          </div>
        </CCol>
      </CRow>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <button class="btn btn-primary" type="button" @click="toHome">
            ホームに戻る
          </button>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page500',
  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>
