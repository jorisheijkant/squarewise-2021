<template>
    <section class="section toc">
        <h2 class="toc-header">Visie</h2>
        <prismic-rich-text class="toc-text" :field="slice.primary.visionText"/>

        <hr class="toc-hr" />

        <h2 class="toc-header">Impact</h2>
        <prismic-rich-text class="toc-text" :field="slice.primary.impactText"/>

        <div class="outcomes-wrapper">
            <h2 class="toc-header">Outcomes</h2>
            <prismic-rich-text class="toc-text" :field="slice.primary.outcomesText"/>
        </div>

        <div class="outputs-wrapper">
            <h2 class="toc-header">Outputs</h2>

            <div class="outputs-grid">
                <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="output">
                    <h4>{{ item.outcomeTitle }}</h4>
                    <prismic-rich-text :field="item.outcomeText" />

                    <button class="read-more" v-scroll-to="`.${item.outcomeClassName}`">Lees meer</button>
                </div>
            </div>

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
