<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon icon="@/assets/brand/logo.png" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderDropdownAccnt,
  },
}
</script>
