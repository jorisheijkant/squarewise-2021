<template>
    <div class="container index">
        <!-- Top nav -->
        <navigation />

        <!-- arrow icon -->
        <nav class="arrow-to-top" @click="scrollToTop()">
            <img src="../assets/img/arrow-down.svg" alt=""/>
        </nav>

        <!-- Rest of the content is from Prismic -->
        <SliceZone class="slice-wrapper" type="page" uid="dieke-schutjens" />

        <squarewise-footer />
    </div>
</template>

<script>
import SliceZone from 'vue-slicezone';
import navigation from "~/components/navigation";

import {mapState} from 'vuex';

export default {
    name: 'index',

    components: {SliceZone, navigation},

    computed: {
        ...mapState(['chapters'])
    },

    mounted() {
        this.checkQuery()
    },

    methods: {
        scrollToTop() {
            this.$scrollTo('.nav');
        },

        checkQuery() {
            if(this.$route && this.$route.query && this.$route.query.h) {
                let chapter = this.$route.query.h;
                setTimeout(() => {
                    this.$scrollTo(`.${chapter}`, {
                        duration: 0
                    })
                }, 300);
                // if(this.chapters && this.chapters.length > 0) {
                //     console.log(this.chapters);
                //     let chapter = this.chapters.find(c => c.slug === this.$route.query.h);
                //     if(chapter) {
                //         console.log('chapter found', chapter.slug);
                //         this.$scrollTo(`.${chapter.slug}`)
                //     }
                // }
            }
        }
    },

    head() {
        return {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;900&display=swap'
                }
            ]
        }
    }
}
</script>
