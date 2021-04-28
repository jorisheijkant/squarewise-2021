<template>
    <section class="section contents">
        <prismic-rich-text :field="slice.primary.title" class="title"/>

        <div class="contents-section">
            <div class="chapter-teaser" v-for="(chapter, index) in chapters" v-scroll-to="`.${chapter.slug}`" :key="`menu-chapter-${index}`">
                <img class="image" v-lazy="chapter.image" :alt="`Illustratie bij hoofdstuk ${chapter.title}`">
                <div class="content">
                    <h4 class="chapter-title">{{chapter.title}}</h4>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex';

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

    computed: {
        ...mapState(['chapters'])
    }
}
</script>
