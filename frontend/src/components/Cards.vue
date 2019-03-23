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
          <option v-for="expansion in [
                         { value: '', text: '全て' },
                         { value: 'standard', text: 'スタンダード' },
                         ...expansions
                       ]"
                  :key="expansion.text" :value="expansion.value">
            {{ expansion.text }}
          </option>
        </select>
      </div>

      <div class="form-group mx-2" id="type">
        <label class="mx-1" for="type">種類</label>
        <select class="form-control-sm" id="type" v-model="type">
          <option v-for="type in [{ value: '', text: '全て' }, ...types]"
                  :key="type.text" :value="type.value">
            {{ type.text }}
          </option>
        </select>
      </div>

      <div class="form-group mx-2" id="rarity">
        <label class="mx-1" for="rarity">レアリティ</label>
        <select class="form-control-sm" id="rarity" v-model="rarity">
          <option v-for="rarity in [{ value: '', text: '全て' }, ...rarities]"
                  :key="rarity.text" :value="rarity.value">
            {{ rarity.text }}
          </option>
        </select>
      </div>

    </div>

  </form>
  <div class="card-lists">
    <div class="container">
      <div class="row">
        <ul class="pagination mx-1">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <a class="page-link" href="#" @click="movePage(1)">&laquo;</a>
          </li>
          <li class="page-item" :class="{ diabled: page === 1 }">
            <a class="page-link" href="#" @click="movePage(page - 1)">&lt;</a>
          </li>
          <li v-for="p in pages" :key="p" :class="['page-item', p === page ? 'active': '']">
            <a class="page-link" href="#" @click="movePage(p)">{{ p }}</a>
          </li>
          <li class="page-item" :class="{ disabled: page === lastPage }">
            <a class="page-link" href="#" @click="movePage(page + 1)">&gt;</a>
          </li>
          <li class="page-item" :class="{ diabled: page === lastPage }">
            <a class="page-link" href="#" @click="movePage(lastPage)">&raquo;</a>
          </li>
        </ul>
      </div>
      <div class="row">
        <div v-for="card in dataBlock.cards" :key="card.id" class="col-xs-3">
          <img :src="imgURL(card.id)">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getCards } from '@/api/api'
import { klasses, expansions, types, rarities, standardSets } from '@/util/util'
export default {
  name: 'Cards',
  data: () => ({
    cardClass: '',
    expansion: '',
    type: '',
    rarity: '',
    page: 1,
    blockNum: 20,
    klasses,
    expansions,
    types,
    rarities,
  }),
  methods: {
    imgURL (id) {
      const baseURL = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
      return baseURL + `${id}.png`
    },
    movePage (page) {
      this.page = page
    }
  },
  asyncComputed: {
    dataBlock () {
      let query = ''
      if (this.cardClass) {
        query += `&cardClass=${this.cardClass}`
      }
      if (this.expansion) {
        if (this.expansion === 'standard') {
          query += `&expansion=${standardSets().join(',')}`
        } else {
          query += `&expansion=${this.expansion}`
        }
      }
      if (this.type) {
        query += `&type=${this.type}`
      }
      if (this.rarity) {
        query += `&rarity=${this.rarity}`
      }
      if (this.page) {
        query += `&page=${this.page}`
      }
      if (this.blockNum) {
        query += `&blockNum=${this.blockNum}`
      }
      return getCards(query).then(res => res.data)
    },
    lastPage () {
      const { total } = this.dataBlock
      return Math.ceil(total / this.blockNum)
    },
    pages () {
      let start = this.$_.max([this.page - 2, 1])
      let end = this.$_.min([start + 5, this.lastPage + 1])
      start = this.$_.max([end - 5, 1])
      return this.$_.range(start, end)
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
