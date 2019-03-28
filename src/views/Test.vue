<template>
  <div class="test" ref="test"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs)

      d3.select(this.$refs.test).append('svg')
        .attr('width', 200)
        .attr('height', 200)
        .append('circle')
        .attr('fill', '#777')
        .attr('r', 15)
        .attr('cx', 100)
        .attr('cy', 100)
        .call(d3.drag().on('start', () => { console.log(111111) }))
    })
  }
}
</script>
