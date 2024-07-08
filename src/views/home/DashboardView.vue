<script setup>
    import { onMounted, ref, h } from 'vue'; //recupera de provide
    import { NButton } from "naive-ui";
    import useRedirect from '@/composables/useRedirect'

    // DATA
    const { goto, getList, showElementsBy } = useRedirect()
    const categories = ref([])
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
                        onClick: () => showElementsBy(row, 'category')
                    },
                    { default: () => 'Elements' }
                )
            }
        }
    ])

    // MOUNTED
    onMounted( async () => {
        const { data } = await getList('category/')
        categories.value = data.results
    })

    // METHODS
</script>
<template>
    <h1 class="text-lg text-green-900">
        Categories list
    </h1>
    <NButton type="primary" @click="goto('types')" class="my-3">Types</NButton>
    <div>
        <n-data-table
            :columns="columns"
            :data="categories"
            
            :bordered="false"
        />
    </div>
</template>