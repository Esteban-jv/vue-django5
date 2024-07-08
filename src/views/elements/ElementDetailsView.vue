<script setup>
    import { onMounted, ref, h } from 'vue'; //recupera de provide
    import { useRoute } from 'vue-router';
    import { NButton } from "naive-ui";
    import useRedirect from '@/composables/useRedirect'

    // DATA
    const { goto, getList } = useRedirect()
    const route = useRoute()
    const element = ref({})

    // MOUNTED
    onMounted( async () => {
        const { id } = route.params
        const endpoint = `element-ro/${id}/`
        const { data } = await getList(endpoint)
        element.value = data
    })

    // METHODS
</script>
<template>
    <h1 class="text-lg text-green-900">
        Elements details
    </h1>
    <div class="container" v-if="element.id">
        <div class="my-2">
            <h1 class="text-4xl text-green-700">{{ element.title }}</h1>
            <div class="flex w-full gap-2 mt-2">
                <div class="flex flex-auto w-30">
                    <div class="text-xl">Price: ${{ element.price }}</div>
                </div>
                <div class="flex flex-auto w-70">
                    <div class="text-xl">Slug: {{ element.slug }}</div>
                </div>
            </div>
        </div>
        <hr class="my-4">
        <p class="text-gray-700">
            {{ element.description }}
        </p>
    </div>
    <!-- <NButton type="primary" @click="goto('categories')" class="my-3">All Categories</NButton> -->
</template>