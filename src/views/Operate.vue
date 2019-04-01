<template>
  <div class="main">
    <a-layout class="main-layout">
      <a-layout-sider class="sider">
        <a-collapse accordion>
          <a-collapse-panel header="分类1" key="1">
            <div class="element" v-for="(item, key) in eleList" :key="key">
              <drag class="drag"
                :transfer-data="item"
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
              <svg class="chart-area" ref="chart" v-cos="clickoutside" @click.prevent="clickoutside"></svg>
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

import * as Rx from 'rx-lite'

function changePosition (el) {
  // console.log(1111)

  d3.select(el)
    .attr('transform', `translate(${event.clientX}, ${event.clientY})`)
    // .attr('cx', d3.event.x)
    // .attr('cy', d3.event.y)
}

let subject = new Rx.Subject()
subject.throttle(15)
  .subscribe(changePosition)

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
      subject: null,
      activeNode: null
    }
  },
  methods: {
    clickoutside () {
      // console.log(1111)
      d3.select(this.$refs.chart).selectAll('g')
        .classed('active', false)
    },
    handleDrop (data, event) {
      this.over = false

      // let toggle =
      //   (function () {
      //     let active = false
      //     return function () {
      //       active = !active
      //       return active
      //     }
      //   })()

      let group = d3.select(this.$refs.chart)
        .append('g')
        .attr('transform', `translate(${event.clientX}, ${event.clientY})`)
        // .attr('cx', event.clientX)
        // .attr('cy', event.clientY)
        // .classed('active', true)
        .call(d3.drag().on('drag', function () { subject.onNext(this) }))
        .on('click', (...[,, el]) => {
          // this.clickoutside
          el = el[0]
          this.clickoutside()
          // d3.selectAll('g').classed('active', false)
          if (this.activeNode === el) {
            d3.select(el).classed('active', false)
            this.activeNode = null
          } else {
            d3.select(el).classed('active', true)
            this.activeNode = el
          }

          d3.event.stopPropagation()
        })

      group.append('circle')
        .attr('fill', '#777')
        .attr('r', 15)
        // .call(d3.drag().on('drag', changePosition))

      group.append('text')
        .text(data.text)
        .attr('y', 30)
    }
  },
  mounted () {
    document.addEventListener('keyup', e => {
      if (e.keyCode === 46 && this.activeNode) {
        d3.select(this.activeNode).remove()
      }
    })
  },
  destroyed () {
    document.removeEventListener('keyup')
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
  // background: rgba(0, 0, 0, 0)
  cursor: pointer
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

<style lang="sass">
text
  text-anchor: middle
  dominant-baseline: middle

g
  cursor: pointer
  &.active
    circle
      fill: red
</style>
