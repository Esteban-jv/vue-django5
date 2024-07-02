<script setup>
    import { inject, onMounted, ref, h } from 'vue'; //recupera de provide
    import { NButton } from "naive-ui";

    const axios = inject('axios')

    // DATA
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
                        onClick: () => play(row)
                    },
                    { default: () => 'Play' }
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
    const getList = async endpoint => axios.get(`http://localhost:8000/api/${endpoint}`)
    const play = row => console.log(row)
</script>
<template>
    <h1>
        Types list
    </h1>
    <span>
        <RouterLink :to="{name: 'home'}">Categories</RouterLink>
    </span>
    <div>
        <h4>Types</h4>
        <n-data-table
            :columns="columns"
            :data="types"
            
            :bordered="false"
        />
    </div>
</template>