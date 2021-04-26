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

export default {
    name: 'index',

    components: {SliceZone, navigation},

    methods: {
        scrollToTop() {
            console.log('scrolling to top');
            this.$scrollTo('.nav');
        }
    },

    // head() {
    //     return {
    //         link: [
    //             {
    //                 rel: 'preconnect',
    //                 href: 'https://fonts.gstatic.com'
    //             },
    //             {
    //                 rel: 'stylesheet',
    //                 href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Source+Sans+Pro:wght@300;400;900&display=swap'
    //             }
    //         ]
    //     }
    // }
}
</script>
