//register a Vue component for drawing transcripts
Vue.component('transcript', {
  props: {data: Object},
  //uses relative units (%) to stretch with the viewport width
  template: `<div class="transcript" :class="{rev:data.strand == -1}" :title="data.info">
    <div class="line" :style="{left:data.left, width:data.width}"></div>
    <div class="exon" v-for="ex in data.Exon" :style="{left:ex.left, width:ex.width}"></div>
  </div>`
});