<template>
  <div>
    <CRow class="justify-content-between" :xs="{ cols: 1 }" :md="{ cols: 2 }">
      <CCol>
        <h1>カメラデバイス一覧</h1>
      </CCol>
      <CCol class="align-self-center" style="text-align: end">
        <CButton color="success" variant="outline" @click="addCamera">
          カメラデバイス追加
        </CButton>
      </CCol>
    </CRow>
    <div class="tb-wrap my-3">
      <table>
        <tr class="tb-title">
          <th>デバイス名</th>
          <th>登録日</th>
          <th>カメラ名</th>
          <th>ステータス</th>
        </tr>
        <div
          class="tb-row"
          v-for="(deviceData, dindex) in deviceList"
          :key="dindex"
        >
          <tr
            v-for="(cameraData, cindex) in deviceData.cameraList"
            :key="cindex"
          >
            <div style="display: contents" v-if="cindex == 0">
              <td>{{ deviceData.deviceName }}</td>
              <td>{{ deviceData.redisteredDate }}</td>
              <td>{{ cameraData.cameraName }}</td>
              <td>
                <CBadge color="success" v-if="cameraData.status">Active</CBadge>
                <CBadge color="danger" v-else>InActive</CBadge>
              </td>
            </div>
            <div style="display: contents" v-else>
              <td></td>
              <td></td>
              <td>{{ cameraData.cameraName }}</td>
              <td>
                <CBadge color="success" v-if="cameraData.status">Active</CBadge>
                <CBadge color="danger" v-else>InActive</CBadge>
              </td>
            </div>
          </tr>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from '@/store/index'
import api from '@/api'

export default {
  name: 'CameraSetting',
  setup() {
    let deviceList = ref([])
    const option = {
      headers: {
        authorization: `Bearer ${store.getters.jwt}`,
      },
    }
    api.get(`https://api.sus-dx.sora210.net/list/`, option).then((res) => {
      console.log(res.data)
      deviceList.value = res.data
    })

    return {
      deviceList,
    }
  },
  methods: {
    addCamera: function () {
      alert('この機能は未実装です')
    },
  },
}
</script>

<style scoped>
.tb-wrap {
  width: 100%;
}
table {
  border-bottom: solid 2px #2e58b8;
  width: 100%;
}
@media screen and (max-width: 500px) {
  table {
    width: 450px;
  }
  .tb-wrap {
    overflow-x: scroll;
  }
}

tr {
  height: 4em;
  text-align: center;
}
td,
th {
  vertical-align: middle;
}
.tb-title {
  background-color: #2e58b81a;
  border-top: solid 2px #2e58b8;
  border-bottom: solid 2px #2e58b8;
}
.tb-row {
  display: table-row-group;
}
.tb-row:nth-child(odd) {
  background-color: #e3e3e3;
}
</style>
