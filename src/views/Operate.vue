<template>
  <div class="main">
    <a-layout class="main-layout">
      <a-layout-sider class="sider">
        <a-collapse accordion>
          <a-collapse-panel header="分类1" key="1">
            <div class="element" v-for="(item, key) in eleList" :key="key">
              <drag class="drag"
                :transfer-data="{ example: 'drop effects (copy)' }"
                :effect-allowed="['copy']"
                drop-effect="copy"
              >
                <div class="icon"></div>
              </drag>
              <div class="text">{{item.text}}</div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-layout-sider>
      <a-layout>
        <!-- <a-layout-header>Header</a-layout-header> -->
        <a-layout-content>
          <drop class="chart-area"
            :class="{ over }"
            @dragover="over = true"
            @dragleave="over = false"
            @drop="handleDrop">

          </drop>
        </a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
      <a-layout-sider>Sider</a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Operate',
  data () {
    return {
      over: false,
      eleList: [
        {
          type: 'test',
          icon: '',
          text: 'test'
        }
      ]
    }
  },
  methods: {
    handleDrop (data) {
      this.over = false
      alert(`You dropped with data: ${JSON.stringify(data)}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '@/sass/theme.sass'
@import '@/sass/utils.scss'

.main-layout
  width: 100vw
  height: 100vh

.sider
  @include dark-theme()

.element
  width: 40px
  .icon
    height: 40px
    width: 40px
    background: #777
    border-radius: 50%
  .text
    text-align: center

.chart-area
  width: 100%
  height: 100%
</style>
