<script setup>
    import { ref, h } from 'vue'
    import { RouterLink } from 'vue-router';

    import { NIcon } from 'naive-ui';
    import { 
      BookOutline as BookIcon,
      PersonOutline as PersonIcon,
      WineOutline as WineIcon,
      HomeOutline as HomeIcon
    } from '@vicons/ionicons5';
    import Header from '../components/Header.vue'

    const collapsed = ref(false)
    const menuOptions = ref([
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
          { default: () => "Categories" }
        ),
        key: "categories",
        icon: renderIcon(PersonIcon),
      },
      {
        label: () => h(
          RouterLink,
          {
            to: {
              name: "types"
            }
          },
          { default: () => "Types" }
        ),
        key: "types",
        icon: renderIcon(PersonIcon),
      },
      {
        label: "Elements",
        key: "elements",
        icon: renderIcon(BookIcon),
        children: [
            {
              label: () => h(
                RouterLink,
                {
                  to: {
                    name: "elements"
                  }
                },
                { default: () => "All elements" }
              ),
              key: "elements-all",
              icon: renderIcon(HomeIcon)
            },
            {
                label: "New Element",
                key: "element",
                disabled: true,
            },
        ]
      },
      {
          label: "Another link",
          key: "a-wild-sheep-chase",
          disabled: true,
          icon: renderIcon(WineIcon),
      },
    ])

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
          :collapsed-width="30"
          :width="200"
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
          <!-- <NLayoutHeader>Título</NLayoutHeader> -->
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