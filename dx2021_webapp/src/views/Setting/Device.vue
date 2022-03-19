<template>
  <div>
    <CRow class="justify-content-between" :xs="{ cols: 1 }" :md="{ cols: 2 }">
      <CCol>
        <h1>カメラデバイス一覧</h1>
      </CCol>
      <CCol class="align-self-center" style="text-align: end">
        <CButton color="success" variant="outline">
          カメラデバイス追加
        </CButton>
      </CCol>
    </CRow>
    <div class="tb-wrap my-3">
      <table>
        <tr class="tb-title">
          <th>デバイス名</th>
          <th>登録日</th>
          <th>カメラ</th>
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
export default {
  name: 'CameraSetting',
  setup() {
    const deviceList = [
      {
        deviceName: 'Jetson-1',
        redisteredDate: '2022-03-09',
        cameraList: [
          {
            cameraName: 'Camera 1',
            status: true,
          },
          {
            cameraName: 'Camera 2',
            status: false,
          },
        ],
      },
      {
        deviceName: 'Jetson-2',
        redisteredDate: '2022-03-10',
        cameraList: [
          {
            cameraName: 'Camera 3',
            status: true,
          },
        ],
      },
    ]

    return {
      deviceList,
    }
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
