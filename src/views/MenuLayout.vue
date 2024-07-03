<script setup>
</script>
<template>
    <NSpace justify="center">
    <NLayout has-sider>
      <NLayoutSider>Menu</NLayoutSider>

      <NLayout>
        <NLayoutHeader>Título</NLayoutHeader>
        <NLayoutContent content-style="padding: 10px;">
            <RouterView />
        </NLayoutContent>
        <NLayoutFooter>Footer</NLayoutFooter>
      </NLayout>
    </NLayout>
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