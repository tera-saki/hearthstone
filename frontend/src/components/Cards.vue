<template>
<div class="root">
  <form class="card-selector">
    <div class="form-row">
      <div class="form-group mx-2" id="cardClass">
        <label class="mx-1" for="cardClass">クラス</label>
        <select class="form-control-sm" id="cardClass" v-model="params.cardClass">
          <option v-for="klass in [{ value: '', text: '全て' }, ...klasses]"
                  :key="klass.text" :value="klass.value">
            {{ klass.text }}
          </option>
        </select>
      </div>

      <div class="form-group mx-2" id="expansion">
        <label class="mx-1" for="expansion">セット</label>
        <select class="form-control-sm" id="expansion" v-model="params.expansion">
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
        <select class="form-control-sm" id="type" v-model="params.type">
          <option v-for="type in [{ value: '', text: '全て' }, ...types]"
                  :key="type.text" :value="type.value">
            {{ type.text }}
          </option>
        </select>
      </div>

      <div class="form-group mx-2" id="rarity">
        <label class="mx-1" for="rarity">レアリティ</label>
        <select class="form-control-sm" id="rarity" v-model="params.rarity">
          <option v-for="rarity in [{ value: '', text: '全て' }, ...rarities]"
                  :key="rarity.text" :value="rarity.value">
            {{ rarity.text }}
          </option>
        </select>
      </div>

      <button type="button"
              class="btn btn-sm btn-secondary ml-auto"
              @click="initParams()">
        リセット
      </button>
    </div>

    <div class="form-row">
      <div class="form-group mx-2">
        <label class="mx-1" for="cost">コスト</label>
        <button v-for="c in ['0', '1', '2', '3', '4', '5', '6', '7', '8+']"
                type="button" :key="c"
                :class="['btn', params.cost.includes(c) ? 'btn-primary': 'btn-light', 'cost-button']"
                @click="changeCost(c)">
          {{ c }}
        </button>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group mx-2">
        <label class="mx-1" for="text">文字列検索</label>
        <input type="text" class="form-control-sm" name="text" v-model="params.text" debounce="2000"/>
      </div>
    </div>

  </form>
  <div class="card-lists">
    <div class="container">
      <div class="row">
        <ul class="pagination mx-1">
          <li class="page-item" :class="{ disabled: params.page === 1 }">
            <a class="page-link" href="#" @click="movePage(1)">&laquo;</a>
          </li>
          <li class="page-item" :class="{ diabled: params.page === 1 }">
            <a class="page-link" href="#" @click="movePage(params.page - 1)">&lt;</a>
          </li>
          <li v-for="p in pages" :key="p" :class="['page-item', p === params.page ? 'active': '']">
            <a class="page-link" href="#" @click="movePage(p)">{{ p }}</a>
          </li>
          <li class="page-item" :class="{ disabled: params.page === lastPage }">
            <a class="page-link" href="#" @click="movePage(params.page + 1)">&gt;</a>
          </li>
          <li class="page-item" :class="{ diabled: params.page === lastPage }">
            <a class="page-link" href="#" @click="movePage(lastPage)">&raquo;</a>
          </li>
        </ul>
      </div>
      <div class="row">
        <div v-for="card in cards" :key="card.id" class="col-xs-3">
          <img :src="imgURL(card.id)"
                v-tooltip="{
                  content: card.flavor,
                  placement: 'top',
                  class: 'tooltip-custom',
                }"
           />
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
    cards: {},
    total: '',
    params: {
      cardClass: '',
      expansion: '',
      type: '',
      rarity: '',
      cost: [],
      text: '',
      page: 1,
      blockNum: 20,
    },
    klasses,
    expansions,
    types,
    rarities,
  }),
  async created () {
    await this.getData()
  },
  methods: {
    async getData () {
      //this._.debounce(() => {
      let query = ''
      const { params } = this
      if (params.cardClass) {
        query += `&cardClass=${params.cardClass}`
      }
      if (params.expansion) {
        if (params.expansion === 'standard') {
          query += `&expansion=${standardSets().join(',')}`
        } else {
          query += `&expansion=${params.expansion}`
        }
      }
      if (params.type) {
        query += `&type=${params.type}`
      }
      if (params.rarity) {
        query += `&rarity=${params.rarity}`
      }
      if (params.cost.length > 0) {
        query += `&cost=${encodeURIComponent(params.cost.join(','))}`
      }
      if (params.text) {
        query += `&text=${params.text}`
      }
      if (params.page) {
        query += `&page=${params.page}`
      }
      if (params.blockNum) {
        query += `&blockNum=${params.blockNum}`
      }

      const { data } = await getCards(query)
      this.cards = data.cards
      this.total = data.total
    },
    initParams () {
      this.params.cardClass = ''
      this.params.expansion = ''
      this.params.type = ''
      this.params.rarity = ''
      this.params.cost = []
      this.params.text = ''
      this.params.page = 1
    },
    imgURL (id) {
      const baseURL = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x/'
      return baseURL + `${id}.png`
    },
    movePage (page) {
      this.params.page = page
    },
    changeCost (c) {
      const { cost } = this.params
      if (cost.includes(c)) {
        this.params.cost = cost.filter(cost => cost !== c)
      } else {
        this.params.cost.push(c)
      }
    }
  },
  watch: {
    params: {
      async handler() {
        await this.getData()
      },
      deep: true
    }
  },
  computed: {
    lastPage () {
      return Math.ceil(this.total / this.params.blockNum)
    },
    pages () {
      let start = this._.max([this.params.page - 2, 1])
      let end = this._.min([start + 5, this.lastPage + 1])
      start = this._.max([end - 5, 1])
      return this._.range(start, end)
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
  .cost-button {
    border: thin solid gray;
    margin: 2px;
    border-radius: 50%
  }
</style>
