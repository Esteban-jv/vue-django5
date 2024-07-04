<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        options: {
            Type: Array,
            required: true
        }
    })

    const menuOptions = computed(() => {
        return [
            {
                label: "VueApp",
                key: "vue-app",
            },
            ...props.options
        ]
    })

    console.warn(props.options, menuOptions.value)
</script>
<template>
    <NLayout>
        <NLayoutHeader>
            <NMenu :options="menuOptions" mode="horizontal" />
        </NLayoutHeader>
    </NLayout>
</template>