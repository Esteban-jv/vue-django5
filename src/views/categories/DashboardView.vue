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
            title: 'Relations',
            key: 'relations',
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
        },
        {
            title: 'Actions',
            key: 'actions',
            render (row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => goto( 'category-save', { id: row.id } )
                    },
                    { default: () => 'Edit' }
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
    <NButton type="primary" @click="goto('category-save')" class="my-3">Add Category</NButton>
    <div>
        <n-data-table
            :columns="columns"
            :data="categories"
            
            :bordered="false"
        />
    </div>
</template>