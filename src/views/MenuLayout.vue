<script setup>
    import { ref, h } from 'vue'
    import { RouterLink } from 'vue-router';

    import { NIcon } from 'naive-ui';
    import { 
      BookOutline as BookIcon,
      PersonOutline as PersonIcon,
      WineOutline as WineIcon
    } from '@vicons/ionicons5';
    import Header from '../components/Header.vue'

    const collapsed = ref(false)
    const menuOptions = ref([
        {
            label: "Categories",
            key: "cat",
            icon: renderIcon(PersonIcon),
            children: [
                {
                    label: "Cat 1",
                    key: "cat1",
                    disabled: true,
                },
                {
                  label: () => h(
                    RouterLink,
                    {
                      to: {
                        name: "categories",
                        // params: {
                          // lang: "en-US"
                        // }
                      }
                    },
                    { default: () => "Categories list" }
                  ),
                  key: "cat2",
                  // icon: renderIcon(HomeIcon)
                },
            ]
        },
        {
            label: "Tipos",
            key: "types",
            icon: renderIcon(BookIcon),
            children: [
                {
                    label: "Tipo 1",
                    key: "type1",
                    disabled: false,
                },
                {
                  label: () => h(
                    RouterLink,
                    {
                      to: {
                        name: "types",
                        // params: {
                          // lang: "en-US"
                        // }
                      }
                    },
                    { default: () => "Types list" }
                  ),
                  key: "types2",
                  // icon: renderIcon(HomeIcon)
                },
            ]
        },
        {
            label: "Another link",
            key: "a-wild-sheep-chase",
            disabled: true,
            icon: renderIcon(WineIcon),
        },
      ]);

      // METHODS
      function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) });
      }
</script>
<template>
    <Header :options="menuOptions" />
    <NFlex vertical>
      <NLayout has-sider>
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <NMenu
              :collapsed="collapsed"
              :collapsed-width="24"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :render-label="renderMenuLabel"
              :render-icon="renderMenuIcon"
              :expand-icon="expandIcon"
          />
        </NLayoutSider>

        <NLayout>
          <NLayoutHeader>Título</NLayoutHeader>
          <NLayoutContent content-style="padding: 10px;">
              <RouterView />
          </NLayoutContent>
          <NLayoutFooter>Footer</NLayoutFooter>
        </NLayout>
      </NLayout>
  </NFlex>
</template>
<style scoped>
</style>