<script setup>
    import { inject, onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRouter } from 'vue-router';
    import { NButton } from "naive-ui";

    const axios = inject('axios')

    // DATA
    const router = useRouter()
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
        const { data } = await getList('element-ro/')
        types.value = data.results
    })

    // METHODS
    const getList = async endpoint => axios.get(`http://localhost:8000/api/${endpoint}`)
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