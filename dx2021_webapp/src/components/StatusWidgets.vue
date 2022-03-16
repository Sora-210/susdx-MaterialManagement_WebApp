<template>
  <div>
    <div v-for="Lists in list" :key="Lists.index">
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
  setup() {
    const list = [
      [
        'Camera 1',
        [
          {
            name: 'Camera 1 - No.1',
            status: 'many',
          },
          {
            name: 'Camera 1 - No.2',
            status: 'few',
          },
          {
            name: 'Camera 1 - No.3',
            status: 'cover',
          },
        ],
      ],
      [
        'Camera 2',
        [
          {
            name: 'Camera 2 - No.1',
            status: 'none',
          },
          {
            name: 'Camera 2 - No.2',
            status: 'many',
          },
        ],
      ],
      [
        'Camera 3',
        [
          {
            name: 'Camera 3 - No.1',
            status: 'few',
          },
        ],
      ],
      [
        'Camera 4',
        [
          {
            name: 'Camera 4 - No.1',
            status: 'none',
          },
          {
            name: 'Camera 4 - No.2',
            status: 'many',
          },
        ],
      ],
    ]
    return {
      list,
    }
  },
}
</script>
