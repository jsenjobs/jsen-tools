<template>
  <ul class="list-group">
    <li class="list-group-item" v-for='item in books.nips' style="text-align:center;"><a :href="item.href" target='_blank'>{{item.name}}</a></li>
  </ul>
</template>

<script>
import books from './books.json'

export default {
  data () {
    return {
      books: books
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style>
</style>
