<template>
  <div class="root">
    <div class="container">
      <div class="row">
        <div v-for="card in cards" class="col-xs-3">
          <img :src="imgURL(card.id)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCards } from '@/api/api'
export default {
  name: 'Cards',
  data: () => ({
    cards: []
  }),
  async created () {
    const { data } = await getCards()
    this.cards = data
  },
  methods: {
    imgURL (id) {
      const baseURL = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
      return baseURL + `${id}.png`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
