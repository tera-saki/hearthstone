<template>
<div class="root">
  <form class="card-selector">
    <div class="form-row">
      <div class="form-group mx-2" id="cardClass">
        <label class="mx-1" for="cardClass">クラス</label>
        <select class="form-control-sm" id="cardClass" v-model="cardClass">
          <option v-for="klass in [{ value: '', text: '全て' }, ...klasses]"
                  :key="klass.text" :value="klass.value">
            {{ klass.text }}
          </option>
        </select>
      </div>
      <div class="form-group mx-2" id="expansion">
        <label class="mx-1" for="expansion">セット</label>
        <select class="form-control-sm" id="expansion" v-model="expansion">
          <option v-for="expansion in [{ value: '', text: '全て' }, ...expansions]"
                  :key="expansion.text" :value="expansion.value">
            {{ expansion.text }}
          </option>
        </select>
      </div>
    </div>
  </form>
  <div class="card-lists">
    <div class="container">
      <div class="row">
        <div v-for="card in cards" :key="card.id" class="col-xs-3">
          <img :src="imgURL(card.id)">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getCards } from '@/api/api'
import { klasses, expansions } from '@/util/util'
export default {
  name: 'Cards',
  data: () => ({
    cardClass: '',
    expansion: '',
    klasses,
    expansions,
  }),
  methods: {
    imgURL (id) {
      const baseURL = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
      return baseURL + `${id}.png`
    }
  },
  asyncComputed: {
    async cards () {
      let query = ''
      if (this.cardClass) {
        query += `&cardClass=${this.cardClass}`
      }
      if (this.expansion) {
        query += `&expansion=${this.expansion}`
      }
      const { data } = await getCards(query)
      return data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-selector {
    margin: 20px 40px;
    padding: 10px;
    border: thin solid gray;
  }
</style>
