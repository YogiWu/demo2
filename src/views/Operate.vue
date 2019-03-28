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
              <svg class="chart-area" ref="chart"></svg>
          </drop>
        </a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
      <a-layout-sider>Sider</a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import * as d3 from 'd3'

import _ from 'lodash'

// function changePosition () {
//   // console.log(el)
//   d3.select(this)
//     .attr('cx', d3.event.x)
//     .attr('cy', d3.event.y)
// }

function changePosition (el, event) {
  // console.log(el)
  d3.select(el)
    .attr('cx', event.x)
    .attr('cy', event.y)
}

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
      ],
      changePosition: Function
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

      let temp = this.changePosition

      d3.select(this.$refs.chart).append('circle')
        .attr('fill', '#777')
        .attr('r', 15)
        .attr('cx', event.clientX)
        .attr('cy', event.clientY)
        // .call(d3.drag().on('drag', changePosition))
        .call(d3.drag().on('drag', function () { temp(this, d3.event) }))
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs)
      this.changePosition = _.throttle(changePosition, 10)
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
  // background: rgba(0, 0, 0, 0)
  // .ant-layout
  //   opacity: 0

.sider
  @include dark-theme()
  z-index: 2

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
  overflow: hidden

.chart-area
  position: absolute
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  // z-index: -1
</style>
