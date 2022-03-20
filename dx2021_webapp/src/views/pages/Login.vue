<template>
  <div>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol :md="8">
            <h1>資材管理システム</h1>
            <CCardGroup>
              <CCard class="p-4 login-card">
                <CCardBody>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">
                    管理アカウントでログインしてください
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="AccountID"
                      autocomplete="username"
                      v-model="accountId"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        role="button"
                        color="primary"
                        class="px-4"
                        @click="login"
                      >
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
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

    return {
      accountId,
      password,
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
          .post('http://api.sus-dx.sora210.net/login', body)
          .then((res) => {
            this.$store.commit('setJwt', res.data.token)
            if (this.$route.query.path) {
              console.log('path ok')
              this.$router.push({ path: this.$route.query.path })
            } else {
              console.log('path ng')
              this.$router.push({ path: '/' })
            }
          })
          .catch(() => {
            alert('AccountId, Passwordのいずれかが異なります')
          })
      } else {
        alert('accountId, passwordを入力してください')
      }
    },
  },
}
</script>

<style scoped>
.login-card {
  border-left: solid 25px #321fdb;
}
</style>
