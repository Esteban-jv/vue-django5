<script setup>
    import { ref, reactive, inject } from 'vue'
    import { useRouter } from 'vue-router'

    const axios = inject('axios')
    // DATA
    const loading = ref(false)
    const router = useRouter()
    const form = reactive({
        title: '',
        slug: ''
    })
    const errors = ref({
        title: [],
        slug: []
    })

    // METHODS
    const sendPost = async (endpoint, payload) => axios.post(`${import.meta.env.VITE_API_URL}/${endpoint}`, payload)
    const handleSubmit = async () => {
        loading.value = true
        try {
            const response = await sendPost('category/',form)
            console.log(response)
            const { data: { token } } = response
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
    <h1>Save category</h1>
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