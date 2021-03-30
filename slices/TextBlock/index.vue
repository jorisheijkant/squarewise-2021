<template>
    <section class="ps section text">
        <prismic-rich-text :field="slice.primary.description"/>
    </section>
</template>

<script>
export default {
    props: {
        slice: {
            type: Object,
            required: true,
            default() {
                return {}
            },
        },
    },
}
</script>