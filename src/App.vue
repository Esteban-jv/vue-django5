<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <NSpace justify="center">
    <n-layout has-sider>
      <n-layout-sider>Menu</n-layout-sider>

      <n-layout>
        <n-layout-header>Título</n-layout-header>
        <n-layout-content content-style="padding: 10px;">
          <RouterView />
        </n-layout-content>
        <n-layout-footer>Footer</n-layout-footer>
      </n-layout>
    </n-layout>
  </NSpace>
</template>
<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>