<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar size="md" color="success">
        {{ accountName.split('')[0] }}
      </CAvatar>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem class="pointer">
        <CIcon icon="cil-envelope-open" /> AccountName:
        {{ accountName }}
      </CDropdownItem>
      <CDropdownItem class="pointer" @click="noFunc">
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownHeader
        @click="noFunc"
        component="h6"
        class="bg-light fw-semibold py-2 pointer"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem class="pointer" @click="noFunc">
        <CIcon icon="cil-user" /> Profile
      </CDropdownItem>
      <CDropdownItem class="pointer" @click="noFunc">
        <CIcon icon="cil-settings" /> Settings
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem class="pointer" @click="logout">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    const accountName = ref('')
    return {
      accountName,
      itemsCount: 0,
    }
  },
  mounted() {
    this.accountName = this.$store.getters.accountName
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
    noFunc: function () {
      alert('この機能は未実装です')
    },
  },
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
