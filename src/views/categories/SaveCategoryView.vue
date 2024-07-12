<script setup>
    import { ref, inject, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const axios = inject('axios')
    // DATA
    const id = ref(null)
    const loading = ref(false)
    const router = useRouter()
    const route = useRoute()
    const form = ref({
        title: '',
        slug: ''
    })
    const errors = ref({
        title: [],
        slug: []
    })

    // MOUNTED
    onMounted( async () => {
        const { params } = route
        if(params.id) { // Means we edit
            id.value = params.id
            const endpoint = `category/${id.value}/`
            const { data } = await getApi(endpoint)
            form.value = data
        }
    })

    // METHODS
    const send = async (verb, endpoint, payload) => axios[verb](`${import.meta.env.VITE_API_URL}/${endpoint}`, payload)
    const getApi = async (endpoint) => axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`)
    const handleSubmit = async () => {
        loading.value = true
        try {
            const response = id.value ? await send('put',`category/${id.value}/`,form.value): await send('post','category/',form.value)
            console.log(response)
            loading.value = false
            router.push({name: 'categories'})
        } catch (err) {
            /*toast.open({
                message: err.response.data.msg,
                type: 'error'
            })*/
           const { data } = err.response
           errors.value = data
           console.log(errors)
           loading.value = false
        }
    }
    const getStatus = input => {
        if(errors.value[input])
            return errors.value[input].length > 0 ? 'error' : 'success'
        return 'success'
    }
    const getFeedback = input => {
        if(errors.value[input])
            return errors.value[input].length > 1 ? 'Multiples errores' : errors.value[input][0]
        return null
    }
</script>
<template>
    <NSpace vertical>
        <form action="#" @submit.prevent="handleSubmit" class="mt-3">
            <NFormItem label="Title" :feedback="getFeedback('title')">
                <NInput :status="getStatus('title')" v-model:value="form.title" type="text" placeholder="Enter title" />
            </NFormItem>
            <NFormItem label="Slug" :feedback="getFeedback('slug')">
                <NInput :status="getStatus('slug')" v-model:value="form.slug" type="text" placeholder="Enter slug" />
            </NFormItem>
            <NButton type="primary" attr-type="submit">Enviar</NButton>
        </form>
    </NSpace>
</template>