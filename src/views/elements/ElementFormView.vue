<script setup>
    import { ref, inject, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, List, FindAndReplace, Font } from 'ckeditor5';
    import 'ckeditor5/ckeditor5.css';

    const axios = inject('axios')
    // DATA
    const id = ref(null)
    const loading = ref(false)
    const router = useRouter()
    const route = useRoute()
    const form = ref({
        title: '',
        slug: '',
        price: 0,
        description: '',
        type: null,
        category: null
    })
    const errors = ref({
        title: [],
        slug: [],
        price: [],
        description: [],
        type: [],
        category: []
    })
    const categories = ref([])
    const types = ref([])
    const editor = ref(ClassicEditor)
    const editorConfig = ref({
              plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo, List, FindAndReplace, Font ],
              toolbar: [ 'undo', 'redo', 'findandreplace', '|', 
                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                    'pharagraph', 'bold', 'italic', '|',
                    'bulletedList', 'numberedList'
                ],
              licenseKey: '<YOUR_LICENSE_KEY>',
              mention: { 
                  // Mention configuration
              },
            })

    // MOUNTED
    onMounted( async () => {
        const { params } = route
        if(params.id) { // Means we edit
            id.value = params.id
            const endpoint = `element-ro/${id.value}/`
            const { data } = await getApi(endpoint)
            form.value = data
            // now we handle the catalogs
            form.value.category = data.category.id
            form.value.type = data.type.id
        }
        try {
            // Get categories catalogo
            const catResponse = await getApi('category/all/')
            // console.log(catResponse.data.results)
            categories.value = catResponse.data
            // Get types catalogo
            const typResponse = await getApi('type/all/')
            // console.log(typResponse)
            types.value = typResponse.data
        } catch (err) {
            console.error(err)
            // Should implement some toast
        }
    })

    // METHODS
    const send = async (verb, endpoint, payload) => axios[verb](`${import.meta.env.VITE_API_URL}/${endpoint}`, payload)
    const getApi = async (endpoint) => axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`)
    const handleSubmit = async () => {
        loading.value = true
        try {
            const response = id.value ? await send('put',`element/${id.value}/`,form.value) : await send('post','element/',form.value)
            console.log(response)
            loading.value = false
            router.push({name: 'elements'})
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

    // Computed methods
    const categoryOptions = computed(() => {
        return [{ value: null, label: '-- Select --'}].concat(categories.value.map((c) => {
          return { value: c.id, label: c.title }
        }))
    })
    const typeOptions = computed(() => {
        return [{ value: null, label: '-- Select --'}].concat(types.value.map((t) => {
          return { value: t.id, label: t.title }
        }))
    })


</script>
<template>
    <h1>Save Element</h1>
    <NSpace vertical>
        <form action="#" @submit.prevent="handleSubmit" class="mt-3">
            <NFormItem label="Title" :feedback="getFeedback('title')">
                <NInput :status="getStatus('title')" v-model:value="form.title" type="text" placeholder="Enter title" />
            </NFormItem>
            <NFormItem label="Slug" :feedback="getFeedback('slug')">
                <NInput :status="getStatus('slug')" v-model:value="form.slug" type="text" placeholder="Enter slug" />
            </NFormItem>
            <NFormItem :feedback="getFeedback('price')">
                <NInputNumber v-model:value="form.price" :status="getStatus('price')">
                    <template #prefix>
                        $
                    </template>
                </NInputNumber>
            </NFormItem>
            <NFormItem label="Description" path="textareaValue" :feedback="getFeedback('description')">
                <NInput :status="getStatus('description')"
                    v-model:value="form.description"
                    placeholder="Textarea"
                    type="textarea"
                    :autosize="{
                    minRows: 3,
                    maxRows: 5
                    }"
                />
            </NFormItem>
            <Ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></Ckeditor>
            <NFormItem label="Category" path="selectValue" :feedback="getFeedback('category')">
                <NSelect
                    :status="getStatus('category')"
                    v-model:value="form.category"
                    placeholder="Select a category"
                    :options="categoryOptions"
                />
            </NFormItem>
            <NFormItem label="Type" path="selectValue" :feedback="getFeedback('type')">
                <NSelect
                    :status="getStatus('type')"
                    v-model:value="form.type"
                    placeholder="Select a type"
                    :options="typeOptions"
                />
            </NFormItem>
            <NButton type="primary" attr-type="submit">Enviar</NButton>
        </form>
    </NSpace>
</template>