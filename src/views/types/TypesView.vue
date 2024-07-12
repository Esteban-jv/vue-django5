<script setup>
    import { onMounted, ref, h } from 'vue'; //recupera de provide
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
            title: 'Relations',
            key: 'relations',
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
                        onClick: () => goto( 'type-save', { id: row.id } )
                    },
                    { default: () => 'Edit' }
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
    <NButton type="primary" @click="goto('type-save')" class="my-3">Add Type</NButton>
    <div>
        <n-data-table
            :columns="columns"
            :data="types"
            
            :bordered="false"
        />
    </div>
</template>