<template>
  <div>
    <CForm class="mb-5">
      <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }">
        <CCol>
          <div class="mb-3">
            <CFormLabel for="cameraNumber">Camera Number</CFormLabel>
            <CFormSelect
              aria-label="CameraNumberSelect"
              :options="cameraNumberSelectOption"
            >
            </CFormSelect>
          </div>
        </CCol>
        <CCol>
          <div class="mb-3">
            <CFormLabel for="cameraDate">日時</CFormLabel>
            <v-date-picker v-model="date" mode="simple">
              <template v-slot="{ inputValue, inputEvents }">
                <CFormInput
                  type="text"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </div>
        </CCol>
      </CRow>
      <div class="mb-3">
        <CButton color="primary" type="submit">検索</CButton>
      </div>
    </CForm>
    <!-- 画像表示 -->
    <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
      <CCol v-for="url in urlList" :key="url" class="mb-3">
        <camera-card :imageUrl="url" :cameraName="url" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CameraCard from '@/components/CameraCard.vue'

export default {
  name: 'CameraOld',
  components: {
    CameraCard,
  },
  setup() {
    const cameraNumberSelectOption = [
      'カメラ番号を選択してください',
      {
        label: 'Camera 1',
        value: 'cam1',
      },
    ]
    let date = new Date()

    const urlList = [
      'http://118.27.110.225/cam1/2022-03-10-00',
      'http://118.27.110.225/cam1/2022-03-10-01',
      'http://118.27.110.225/cam1/2022-03-10-02',
      'http://118.27.110.225/cam1/2022-03-10-03',
      'http://118.27.110.225/cam1/2022-03-10-04',
      'http://118.27.110.225/cam1/2022-03-10-05',
      'http://118.27.110.225/cam1/2022-03-10-06',
      'http://118.27.110.225/cam1/2022-03-10-07',
      'http://118.27.110.225/cam1/2022-03-10-08',
      'http://118.27.110.225/cam1/2022-03-10-09',
      'http://118.27.110.225/cam1/2022-03-10-10',
      'http://118.27.110.225/cam1/2022-03-10-11',
    ]

    return {
      cameraNumberSelectOption,
      date,
      urlList,
    }
  },
}
</script>
