<template>
  <section class="ps section interview">
      <div class="question-wrapper" v-for="(item, i) in slice.items" :key="`slice-item-${i}`">
          <h3 class="question">{{ item.question }}</h3>
          <prismic-rich-text class="answer" :field="item.answer" />
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