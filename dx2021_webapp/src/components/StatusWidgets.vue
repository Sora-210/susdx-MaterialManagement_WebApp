<template>
  <div>
    <div v-for="Lists in datas" :key="Lists.index">
      <h3>{{ Lists[0] }}</h3>
      <CRow class="mb-5" :xs="{ cols: 1 }" :md="{ cols: 3 }" :xl="{ cols: 5 }">
        <CCol v-for="status in Lists[1]" :key="status.name" class="mb-2">
          <status-card :status="status.status" :spaceName="status.name" />
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import StatusCard from '@/components/StatusCard.vue'

export default {
  name: 'StatusWidgets',
  components: {
    StatusCard,
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [
          [
            'Example',
            [
              {
                name: 'example - No.1',
                status: 'many',
              },
            ],
          ],
        ]
      },
    },
  },
}
</script>
