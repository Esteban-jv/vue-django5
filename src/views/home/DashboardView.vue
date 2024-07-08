<script setup>
    import { inject, onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRouter } from 'vue-router';
    import { NButton } from "naive-ui";

    const axios = inject('axios')

    // DATA
    const router = useRouter()
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
                        onClick: () => play(row)
                    },
                    { default: () => 'Play' }
                )
            }
        }
    ])

    // MOUNTED
    onMounted( async () => {
        const { data } = await getList('category/')
        // const typesResult = await getList('type/')
        console.log(data)
        categories.value = data.results
        // types.value = typesResult.data.results
    })

    // METHODS
    const getList = async endpoint => axios.get(`http://localhost:8000/api/${endpoint}`)
    const play = row => goto('elements',{ type: 'category', id: row.id })
    const goto = (path, params=null) => router.push({name: path, params})
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