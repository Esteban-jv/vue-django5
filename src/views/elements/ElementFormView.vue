<script setup>
    import { ref, inject, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, List, FindAndReplace, Font,
        Alignment, Indent, IndentBlock, Underline,Heading, Table,
        TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
        ImageInsert, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar,
        Minimap

     } from 'ckeditor5';
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
    const editorMinimapElement = ref(null)
    const editorConfig = ref({
        plugins: [ Bold, Essentials, Italic, Mention, Paragraph, Undo, List, FindAndReplace, Font,
            Alignment, Indent, IndentBlock, Underline, Heading,
            Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
            ImageInsert, ImageInsertViaUrl, ImageBlock, ImageCaption, ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar,
            Minimap
        ],
        toolbar: [ 'undo', 'redo', 'findandreplace', '|', 
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'underline', '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'indent',
            'outdent',
            '|',
            'insertTable',
            'toggleImageCaption',
            'insertImage',
            'insertImageViaUrl',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            'resizeImage'
        ],
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
        },
        minimap: {
            container: editorMinimapElement,
            extraClasses: 'editor-container_include-minimap ck-minimap__iframe-content'
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
            <!-- <Ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></Ckeditor> -->
            <!-- <div class="main-container">
                <div class="editor-container editor-container_document-editor editor-container_include-annotations" ref="editorContainerElement">
                    <div class="editor-container__menu-bar" ref="editorMenuBarElement"></div>
                    <div class="editor-container__toolbar" ref="editorToolbarElement"></div>
                    <div class="editor-container__editor-wrapper">
                        <div class="editor-container__editor">
                            <div ref="editorElement">
                                <Ckeditor :editor="editor" v-model="form.description" :config="editorConfig" @ready="onReady"></Ckeditor>
                            </div>
                        </div>
                        <div class="editor-container__sidebar editor-container__sidebar_minimap"><div ref="editorMinimapElement"></div></div>
                    </div>
                </div>
            </div> -->
            <div class="main-container">
			<div
				class="editor-container editor-container_document-editor editor-container_include-minimap editor-container_include-style"
				ref="editorContainerElement"
			>
				<div class="editor-container__menu-bar" ref="editorMenuBarElement"></div>
                    <div class="editor-container__toolbar" ref="editorToolbarElement"></div>
                    <div class="editor-container__minimap-wrapper">
                        <div class="editor-container__editor-wrapper">
                            <div class="editor-container__editor">
                                <div ref="editorElement">
                                    <Ckeditor :editor="editor" v-model="form.description" :config="editorConfig"></Ckeditor>
                                </div>
                            </div>
                        </div>
                        <div class="editor-container__sidebar editor-container__sidebar_minimap"><div ref="editorMinimapElement"></div></div>
                    </div>
                </div>
            </div>
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