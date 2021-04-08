<template>
  <section class="section embed">
      <prismic-embed :field="slice.primary.embed" />
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
