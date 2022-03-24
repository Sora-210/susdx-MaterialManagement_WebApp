<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardFooter>
          <CRow :xs="{ cols: 1 }" :md="{ cols: 5 }" class="text-center">
            <CCol class="mb-sm-2 mb-0">
              <div class="text-medium-emphasis">全体区画数</div>
              <strong>{{ allSection }} 区画</strong>
              <CProgress
                class="my-2"
                color="primary"
                thin
                :precision="1"
                :value="100"
              />
            </CCol>
            <CCol class="mb-sm-2 mb-0 d-md-down-none">
              <div class="text-medium-emphasis">多い</div>
              <strong>{{ manySection }} 区画 ({{ manyPercent }}%)</strong>
              <CProgress
                class="my-2"
                color="success"
                thin
                :precision="1"
                :value="manyPercent"
              />
            </CCol>
            <CCol class="mb-sm-2 mb-0">
              <div class="text-medium-emphasis">少ない</div>
              <strong>{{ fewSection }} 区画 ({{ fewPercent }}%)</strong>
              <CProgress
                class="my-2"
                color="warning"
                thin
                :precision="1"
                :value="fewPercent"
              />
            </CCol>
            <CCol class="mb-sm-2 mb-0">
              <div class="text-medium-emphasis">無し</div>
              <strong>{{ noneSection }} 区画 ({{ nonePercent }}%)</strong>
              <CProgress
                class="my-2"
                color="danger"
                thin
                :precision="1"
                :value="nonePercent"
              />
            </CCol>
            <CCol class="mb-sm-2 mb-0 d-md-down-none">
              <div class="text-medium-emphasis">カバー(判定不可)</div>
              <strong>{{ coverSection }} 区画 ({{ coverPercent }}%)</strong>
              <CProgress
                class="my-2"
                color="secondary"
                :value="coverPercent"
                thin
                :precision="1"
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    allSection: {
      type: Number,
      default: 0,
    },
    manySection: {
      type: Number,
      default: 0,
    },
    fewSection: {
      type: Number,
      default: 0,
    },
    noneSection: {
      type: Number,
      default: 0,
    },
    coverSection: {
      type: Number,
      default: 0,
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
