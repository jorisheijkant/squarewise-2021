<template>
  <section class="section block-image">
      <img class="image" v-if="slice.primary.image && slice.primary.image.url" v-lazy="slice.primary.image.url" alt="" />
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
