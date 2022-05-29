<template>
  <div id="card" :class="StatusData.color">
    <div id="camera_status">
      <span class="text" v-for="text in StatusData.status" :key="text.index">
        {{ text }}
      </span>
    </div>
    <div id="camera_name">
      <span class="text">{{ spaceName }}</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#card {
  margin-top: 10px;
  padding: 15px 10px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  animation: ease 1s fade-in;
}

.color_many {
  border: solid 5px #2cb4ad;
}
.color_few {
  border: solid 5px #ffdc00;
}
.color_none {
  border: solid 5px #ef857d;
}
.color_cover {
  border: solid 5px #736d71;
}

#camera_status {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  font-size: 125%;
  font-weight: bold;
}
</style>

<script>
export default {
  name: 'StatusCard',
  props: {
    status: {
      type: String,
      default: 'Status',
    },
    spaceName: {
      type: String,
      default: 'CameraName',
    },
  },
  setup(props) {
    const DefaultList = {
      many: {
        color: 'color_many',
        status: ['多い'],
      },
      few: {
        color: 'color_few',
        status: ['少ない'],
      },
      none: {
        color: 'color_none',
        status: ['無し'],
      },
      cover: {
        color: 'color_cover',
        status: ['カバー', '(判定不可)'],
      },
    }
    const StatusData = DefaultList[props.status]
    return {
      StatusData,
    }
  },
}
</script>
