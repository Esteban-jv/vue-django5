<script setup>
    import { inject, onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRouter, useRoute } from 'vue-router';
    import { NButton } from "naive-ui";

    const axios = inject('axios')

    // DATA
    const BASE_URL = ref('http://localhost:8000/api')
    const router = useRouter()
    const route = useRoute()
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
        const { type, id } = route.params
        const endpoint = (type && id) ? `${type}/${id}/elements/` : 'element-ro/'
        const { data } = await getList(endpoint)
        types.value = data.results ? data.results : data
    })

    // METHODS
    const getList = async endpoint => axios.get(`${BASE_URL.value}/${endpoint}`)
    const play = row => console.log(row)
    const goto = path => router.push({name: path})
</script>
<template>
    <h1 class="text-lg text-green-900">
        Elements list
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