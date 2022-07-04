<template>
  <div>
    <div
      id="back"
      class="bg-light min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow id="login-container">
          <CCol md="7" xl="6">
            <div id="login-form">
              <h1>資材管理システム</h1>
              <div>
                <div id="form-alert">
                  <p>管理アカウントでログインしてください</p>
                  <p id="login-error">{{ login_alert }}</p>
                </div>
                <div id="form-userId" class="form-input-box">
                  <label>AccountId</label>
                  <input type="text" v-model="accountId" />
                </div>
                <div id="form-password" class="form-input-box">
                  <label>Password</label>
                  <input type="password" v-model="password" />
                </div>
                <div id="login_btn" @click="login">
                  <span>Login</span>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import { ref } from 'vue'

import api from '@/api'

export default {
  name: 'Login',
  components: {
    AppFooter,
  },
  setup() {
    const accountId = ref('')
    const password = ref('')
    const login_alert = ref('')

    return {
      accountId,
      password,
      login_alert,
    }
  },
  methods: {
    login: function () {
      if (this.accountId !== '' && this.password !== '') {
        const body = {
          accountId: this.accountId,
          password: this.password,
        }
        api
          .post('https://auth.sus-dx.sora210.net/login', body)
          .then((res) => {
            this.$store.commit('setJwt', res.data.data.token)
            this.$store.commit('setAccountName', 'DemoUser')
            if (this.$route.query.path) {
              this.$router.push({ path: this.$route.query.path })
            } else {
              this.$router.push({ path: '/' })
            }
          })
          .catch(() => {
            this.login_alert = 'AccoundId又はPasswordが異なります'
          })
      } else {
        this.login_alert = 'AccoundId又はPasswordが入力されていません'
      }
    },
  },
}
</script>

<style scoped>
#login-container {
  justify-content: center;
}

#login-form {
  padding: 40px;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.1);
}

.form-input-box {
  margin: 20px 10px;
}

h1 {
  color: #000;
  text-align: center;
  border-bottom: solid 1px #000;
  margin-bottom: 40px;
}

label {
  color: #000;
}

input {
  border: solid 2px rgba(33, 22, 237, 0.5);
  border-radius: 20px;
  font-size: 20px;
  color: #000;
  padding: 5px 20px;
  width: 100%;
  transition: border ease 0.2s;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
}
input:focus {
  transition: border ease 0.2s;
  border: solid 2px rgba(33, 22, 237, 1);
  outline: none;
}

#login_btn {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  margin-top: 45px;
  width: 80%;
  padding: 10px 0;
  background-color: rgba(33, 22, 237, 0.8);
  transition: color ease 0.2s;
  transition: background-color ease 0.2s;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3);
}

#login_btn:after {
  content: '>';
  margin-left: 20px;
  transition: all ease 0.2s;
}

#login_btn:hover {
  background-color: rgba(33, 22, 237, 0.9);
  transition: all ease 0.2s;
}
#login_btn:hover:after {
  margin-left: 30px;
  transition: all ease 0.2s;
}

#form-alert {
  text-align: center;
  color: #000;
}
#login-error {
  color: rgb(218, 0, 73);
  font-weight: bold;
  transition: all ease 0.2s;
}
</style>
