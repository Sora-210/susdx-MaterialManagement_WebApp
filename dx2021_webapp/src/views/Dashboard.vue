<template>
  <div>
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
                  color="success"
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
                  color="primary"
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
    <StatusWidgets :datas="list" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import StatusWidgets from '@/components/StatusWidgets.vue'

import store from '@/store/index'
import api from '@/api'

export default {
  name: 'Dashboard',
  components: {
    StatusWidgets,
  },
  setup() {
    const allSection = ref(0)
    const manySection = ref(0)
    const fewSection = ref(0)
    const noneSection = ref(0)
    const coverSection = ref(0)
    const list = ref([])

    const manyPercent = computed(
      () => Math.floor((manySection.value / allSection.value) * 1000) / 10,
    )
    const fewPercent = computed(
      () => Math.floor((fewSection.value / allSection.value) * 1000) / 10,
    )
    const nonePercent = computed(
      () => Math.floor((noneSection.value / allSection.value) * 1000) / 10,
    )
    const coverPercent = computed(
      () => Math.floor((coverSection.value / allSection.value) * 1000) / 10,
    )

    return {
      allSection,
      manySection,
      fewSection,
      noneSection,
      coverSection,
      manyPercent,
      fewPercent,
      nonePercent,
      coverPercent,
      list,
    }
  },
  async mounted() {
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    api
      .get('https://api.sus-dx.sora210.net/cam1/inference', option)
      .then((res) => {
        let statusJson = res.data.data
        statusJson.forEach((value) => {
          this.list.push(value)
          value[1].forEach((value2) => {
            this.allSection++
            if (value2.status === 'many') {
              this.manySection++
            } else if (value2.status === 'few') {
              this.fewSection++
            } else if (value2.status === 'none') {
              this.noneSection++
            } else if (value2.status === 'cover') {
              this.coverSection++
            }
          })
        })
      })
  },
}
</script>
