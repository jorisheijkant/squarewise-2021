<template>
    <section class="section team">
        <div class="member" v-for="(member, index) in slice.items" :key="`member-${index}`">
            <prismic-image class="member-image" :class="{'empty': !member.image.url}" :field="member.image" />
            <div class="member-bottom">
                <h4 class="member-name">{{member.name}}</h4>
                <p class="member-subheading">Terugblik</p>
                <prismic-rich-text class="member-text" :field="member.back" />
                <p class="member-subheading">Vooruitblik</p>
                <prismic-rich-text class="member-text" :field="member.forward" />
                <p class="member-subheading">Mijn kernwaarde</p>
                <prismic-rich-text class="member-text" :field="member.core" />
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
