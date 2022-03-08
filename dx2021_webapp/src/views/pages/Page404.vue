<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="5">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Not Found</h4>
            <p class="text-medium-emphasis float-start">
              ページが見つかりませんでした
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
  name: 'Page404',
  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>
