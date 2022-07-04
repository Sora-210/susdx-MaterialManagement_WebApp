<template>
  <div>
    <h1>リアルタイム取得(Test)</h1>
    <br />
    <div class="mb-5">
      <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
        <CCol class="align-self-center" style="text-align: center">
          <h3>接続状況:{{ status }}</h3>
        </CCol>
        <CCol>
          <div class="mb-3">
            <CFormLabel for="cameraNumber">カメラ名</CFormLabel>
            <CFormSelect
              aria-label="CameraNumberSelect"
              :options="cameraNumberSelectOption"
              required
            >
            </CFormSelect>
            <CFormFeedback invalid>
              カメラ番号を選択してください
            </CFormFeedback>
          </div>
        </CCol>
        <CCol
          class="align-self-center"
          style="text-align: center"
          :md="{ offset: 6 }"
          :xl="{ offset: 0 }"
        >
          <CButton
            color="primary"
            type="submit"
            @click="getImage"
            style="width: 50%"
            :disable="getStatus"
          >
            画像取得
          </CButton>
        </CCol>
      </CRow>
    </div>
    <br />
    <img id="image" :src="getImageB64" style="width: 90%" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as mqtt from 'mqtt/dist/mqtt.min'

export default {
  name: 'CameraLatest',
  setup() {
    const cameraNumberSelectOption = [
      {
        label: 'Camera 1',
        value: '1',
      },
    ]

    const getImageB64 = ref('')
    const getStatus = ref(false)
    const status = ref('接続待機中...')
    const client = ref({})

    onMounted(() => {
      client.value = mqtt.connect('wss://sus-dx.sora210.net:8088')
      client.value.on('connect', () => {
        status.value = '接続中'
        getStatus.value = true
        client.value.subscribe('image/testProject')
      })
      client.value.on('message', (topic, message) => {
        getImageB64.value = 'data:image/png;base64, ' + message
        status.value = '接続中'
        getStatus.value = true
      })
      client.value.publish('request/testProject', 'connect')
    })

    const getImage = () => {
      console.log('take')
      const message = 'take'
      client.value.publish('request/testProject', message)
      status.value = '取得中...'
      getStatus.value = false
    }

    return {
      status,
      getImage,
      getImageB64,
      cameraNumberSelectOption,
    }
  },
}
</script>
