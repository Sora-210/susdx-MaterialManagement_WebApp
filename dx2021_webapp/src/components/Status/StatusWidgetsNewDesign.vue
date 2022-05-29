<template>
  <div>
    <h3>{{ response[0] }}</h3>
    <CRow class="mb-5" :xs="{ cols: 1 }" :md="{ cols: 3 }" :xl="{ cols: 5 }">
      <CCol v-for="status in response[1]" :key="status.name" class="mb-2">
        <status-card-new-design
          :status="status.status"
          :spaceName="status.name"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import StatusCardNewDesign from '@/components/Status/StatusCardNewDesign.vue'
import { ref } from 'vue'
import store from '@/store/index'
import api from '@/api'

export default {
  name: 'StatusWidgetsNewDesign',
  components: {
    StatusCardNewDesign,
  },
  props: {
    projectId: {
      Type: String,
    },
    cameraId: {
      Type: String,
    },
  },
  setup() {
    const response = ref([])

    return {
      response,
    }
  },
  async mounted() {
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    api
      .get(
        `https://api.sus-dx.sora210.net/${this.projectId}/inference/${this.cameraId}/latest`,
        option,
      )
      .then((res) => {
        this.response = res.data.data[0]
      })
  },
}
</script>
