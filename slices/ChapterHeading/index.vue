<template>
    <section class="ps section heading" :class="slug">
        <h2 class="title" v-if="slice.primary.headingType === 'sectie'">{{ $prismic.asText(slice.primary.title) }}</h2>
        <h3 class="title subheader" v-if="slice.primary.headingType === 'subsectie'">
            {{ $prismic.asText(slice.primary.title) }}</h3>
        <prismic-rich-text class="lead" :field="slice.primary.description"/>
    </section>
</template>

<script>
import {mapMutations} from 'vuex';

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
        slug() {
            if (this.slice && this.slice.primary) {
                return this.slugify(this.slice.primary.title[0].text);
            }
        }
    },

    mounted() {
        // Push to store as chapter if it's not a subheading
        if (this.slice && this.slice.primary && this.slice.primary.headingType === 'sectie') {
            let title = this.slice.primary.title[0].text;
            this.addChapter({title: title, slug: this.slugify(title)})
        }
    },

    methods: {
        ...mapMutations(['addChapter']),

        slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }
    }
}
</script>