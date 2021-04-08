<template>
    <section class="ps section text">
        <div class="text-wrapper">
            <h4 class="title">{{ slice.primary.title }}</h4>
            <prismic-rich-text :field="slice.primary.description"/>
        </div>
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