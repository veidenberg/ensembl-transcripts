//define a Vue component for drawing transcripts
const Transcript = {
  props: {data: Object},
  //uses relative units (%) to stretch with the viewport
  template: `<div class="transcript" :class="{rev:data.strand == -1}" :title="data.info">
    <div class="line" :style="{left:data.left, width:data.width}"></div>
    <div class="exon" v-for="ex in data.Exon" :style="{left:ex.left, width:ex.width}"></div>
  </div>`
};
//register the component (for running it in web browser environment)
Vue.component('transcript', Transcript);
//export the component (for testing it in command-line environment)
if(typeof module !== "undefined") module.exports = Transcript;