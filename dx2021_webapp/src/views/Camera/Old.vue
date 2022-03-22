<template>
  <div>
    <div class="mb-5">
      <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
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
        <CCol
          class="align-self-center"
          style="text-align: end"
          :md="{ offset: 6 }"
          :xl="{ offset: 0 }"
        >
          <CButton
            color="primary"
            type="submit"
            @click="search"
            style="width: 50%"
          >
            検索
          </CButton>
        </CCol>
      </CRow>
    </div>
    <!-- 画像表示 -->
    <CRow :xs="{ cols: 1 }" :md="{ cols: 2 }" :xl="{ cols: 3 }">
      <CCol v-for="imageData in imageList" :key="imageData.index" class="mb-3">
        <camera-card :imageUrl="imageData.url" :cameraName="imageData.name" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import CameraCard from '@/components/CameraCard.vue'

import store from '@/store/index'

import api from '@/api'

export default {
  name: 'CameraOld',
  components: {
    CameraCard,
  },
  setup() {
    const cameraNumberSelectOption = [
      {
        label: 'Camera 1',
        value: 'cam1',
      },
    ]

    const date = ref(new Date())
    const dateFormat = computed(() => {
      let formatString = date.value.getFullYear() + '/'
      if (date.value.getMonth() + 1 < 10) {
        formatString += '0' + (date.value.getMonth() + 1) + '/'
      } else {
        formatString += date.value.getMonth() + 1 + '/'
      }
      if (date.value.getDate() < 10) {
        formatString += '0' + date.value.getDate()
      } else {
        formatString += date.value.getDate()
      }
      console.log(formatString)
      return formatString
    })

    let imageList = ref([])
    const search = async function () {
      imageList.value.length = 0
      const option = {
        headers: {
          authorization: `Bearer ${store.getters.jwt}`,
        },
      }
      api
        .get(
          `http://api.sus-dx.sora210.net/cam1/list/${dateFormat.value}`,
          option,
        )
        .then((res) => {
          console.log(res.data)
          let list = res.data.list
          list.forEach((fileName) => {
            imageList.value.push({
              name: fileName,
              url:
                'http://api.sus-dx.sora210.net/cam1/' +
                fileName.split('.')[0] +
                '?authorization=' +
                store.getters.jwt,
            })
          })
        })
    }

    return {
      cameraNumberSelectOption,
      date,
      imageList,
      dateFormat,
      search,
    }
  },
}
</script>
