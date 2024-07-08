<script setup>
    import { onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRouter } from 'vue-router';
    import { NButton } from "naive-ui";
    import useRedirect from '@/composables/useRedirect'

    // DATA
    const { goto, getList, showElementsBy } = useRedirect()
    const types = ref([])
    const columns = ref([
        {
            title: 'Title',
            key: 'title'
        },
        {
            title: 'Slug',
            key: 'slug'
        },
        {
            title: 'Action',
            key: 'actions',
            render (row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => showElementsBy(row, 'type')
                    },
                    { default: () => 'Elements' }
                )
            }
        }
    ])

    // MOUNTED
    onMounted( async () => {
        const { data } = await getList('type/')
        types.value = data.results
    })

    // METHODS

</script>
<template>
    <h1 class="text-lg text-green-900">
        Types list
    </h1>
    <NButton type="primary" @click="goto('categories')" class="my-3">Categories</NButton>
    <div>
        <n-data-table
            :columns="columns"
            :data="types"
            
            :bordered="false"
        />
    </div>
</template>