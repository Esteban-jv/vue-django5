<script setup>
    import { onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRoute } from 'vue-router';
    import { NButton } from "naive-ui";
    import useRedirect from '@/composables/useRedirect'

    // DATA
    const { goto, getList } = useRedirect()
    const route = useRoute()
    const elements = ref([])
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
            title: 'Details',
            key: 'details',
            render (row) {
                return h(
                    NButton,
                    {
                        strong: true,
                        tertiary: true,
                        size: 'small',
                        onClick: () => goto('element-detail', { id: row.id })
                    },
                    { default: () => 'Details' }
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
                        onClick: () => goto( 'element-save', { id: row.id } )
                    },
                    { default: () => 'Edit' }
                )
            }
        }
    ])

    // MOUNTED
    onMounted( async () => {
        const { type, id } = route.params
        const endpoint = (type && id) ? `${type}/${id}/elements/` : 'element-ro/'
        const { data } = await getList(endpoint)
        elements.value = data.results ? data.results : data
    })

    // METHODS
    const play = row => console.log(row)
</script>
<template>
    <h1 class="text-lg text-green-900">
        Elements list
    </h1>
    <NButton type="primary" @click="goto('element-save')" class="my-3">Add Element</NButton>
    <div>
        <n-data-table
            :columns="columns"
            :data="elements"
            
            :bordered="false"
        />
    </div>
</template>