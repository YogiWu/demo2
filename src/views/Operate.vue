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
          <drop class="drop-area"
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
    <svg class="chart-area" ref="chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

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
    handleDrop (data, event) {
      this.over = false
      console.log(event)
      // alert(`You dropped with data: ${JSON.stringify(data)}`)

      // const width = this.$refs.dropArea.$el.offsetWidth
      // const height = this.$refs.dropArea.$el.offsetHeight

      console.log(this.$refs.chart)

      d3.select(this.$refs.chart).append('circle')
        .attr('fill', '#777')
        .attr('r', 15)
        .attr('cx', event.clientX)
        .attr('cy', event.clientY)
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '@/sass/theme.sass'
@import '@/sass/utils.sass'

.main-layout
  width: 100vw
  height: 100vh
  background: rgba(0, 0, 0, 0)
  .ant-layout
    opacity: 0

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

.drop-area
  width: 100%
  height: 100%

.chart-area
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: 0
  z-index: -1
</style>
