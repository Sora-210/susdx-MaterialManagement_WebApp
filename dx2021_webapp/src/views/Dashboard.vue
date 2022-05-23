<template>
  <div>
    <StatusBar
      :allSection="allSection"
      :manySection="manySection"
      :fewSection="fewSection"
      :noneSection="noneSection"
      :coverSection="coverSection"
    />
    <StatusWidgets :datas="list" />
  </div>
</template>

<script>
import { ref } from 'vue'
import StatusWidgets from '@/components/Status/StatusWidgets.vue'
import StatusBar from '@/components/Status/StatusBar.vue'

import store from '@/store/index'
import api from '@/api'

export default {
  name: 'Dashboard',
  components: {
    StatusWidgets,
    StatusBar,
  },
  setup() {
    const allSection = ref(0)
    const manySection = ref(0)
    const fewSection = ref(0)
    const noneSection = ref(0)
    const coverSection = ref(0)
    const list = ref([])

    return {
      allSection,
      manySection,
      fewSection,
      noneSection,
      coverSection,
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
      .get(
        'https://api.sus-dx.sora210.net/testProject/inference/1/latest',
        option,
      )
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
