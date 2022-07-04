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
                  <p>
                    {{ login_alert }}
                  </p>
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
    const login_alert = ref('管理アカウントでログインしてください')

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
        this.login_alert = 'AccoundId又はPasswordが異なります'
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
  padding: 30px;
  backdrop-filter: blur(5px);
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
  border: solid 1px rgba(33, 22, 237, 0.5);
  border-radius: 20px;
  font-size: 20px;
  color: #000;
  padding: 5px 20px;
  width: 100%;
  transition: border ease 0.2s;
}
input:focus {
  transition: border ease 0.2s;
  border: solid 1px rgba(33, 22, 237, 1);
  outline: none;
}

#login_btn {
  color: #000;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  margin-top: 45px;
  width: 80%;
  padding: 10px 0;
  border: solid 3px rgba(33, 22, 237, 0.3);
  transition: color ease 0.2s;
  transition: background-color ease 0.2s;
}

#login_btn:hover {
  background-color: rgba(33, 22, 237, 0.3);
  color: #fff;
  transition: all ease 0.2s;
}

#form-alert {
  text-align: center;
  color: #000;
}
</style>
