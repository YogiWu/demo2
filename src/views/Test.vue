<template>
  <div class="test">
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

import * as Rx from 'rx-lite'

function log (ele) {
  console.log(ele)
  console.log(d3.event)
}

export default {
  data () {
    return {
      scene: null,
      nodeList: [
        {
          text: '1111',
          x: '100',
          y: '200'
        },
        {
          text: '2222',
          x: '200',
          y: '200'
        }
      ]
    }
  },
  methods: {
    // addNode () {
    //   this.scene.append('g')
    //     .data
    // }
  },
  mounted () {
    let subject = new Rx.Subject()

    // console.log(subject)

    subject.throttle(1000)
      .subscribe(log)

    document.addEventListener('click', () => {
      console.log(d3.event)
    })

    this.scene = d3.select('svg')
      .attr('width', 400)
      .attr('height', 400)
      .selectAll('g').data(this.nodeList).enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    this.scene.append('circle')
      .attr('fill', '#777')
      .attr('r', 15)
      // .attr('cx', 100)
      // .attr('cy', 100)
      .call(d3.drag().on('drag', function () {
        subject.onNext(this)
        // console.log(d3.event)
      }))
      .on('focusout', () => { console.log(22222) })

    this.scene.append('text')
      .text(d => {
        console.log(d)
        return d.text
      })
      .attr('x', 20)
      .attr('y', 3)
  }
}
</script>
