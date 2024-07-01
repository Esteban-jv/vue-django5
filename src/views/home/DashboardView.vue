<script setup>
    import { inject, onMounted } from 'vue'; //recupera de provide

    const axios = inject('axios')
    onMounted( async () => {
        // axios.get("http://localhost:8000/api/category/")
        const { data } = await getList()
        console.log(data)
    })

    const getList = async () => axios.get("http://localhost:8000/api/category/")
</script>
<template>
    <h1>
        Hello from list
    </h1>
</template>