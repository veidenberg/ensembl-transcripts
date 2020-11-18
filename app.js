/*
Root JavaScript file for Ensembl assessment webapp
Docs: https://github.com/veidenberg/enesembl
Andres Veidenberg 2020
*/

//create new Vue instance (bind datamodel to DOM)
new Vue({
	//mounting point
	el: '#app',

	//observed data
	data: {
		geneID: "",   //search box text
		geneData: {}, //downloaded gene data
		gene: {},     //processed gene data
		error: '',    //current error message
		order: -1, 	  //transcript sorting order
		history: [],  //gene data cache
		example: {},  //example gene data
		to: 0,        //error message timer
		busy: false,  //REST API request status
		req: {}  			//REST API request controller
	},

	//these functions are run on each page load
	mounted() {
		//read the example gene data
		fetch('example_gene.json')
		.then(text => text.json())
		.then(json => this.example = json)
		.catch(error => console.error('Cannot read JSON file: '+error));

		//read stored cache
		if(localStorage.getItem('genes')){
      try {
				this.history = JSON.parse(localStorage.getItem('genes'));
				//draw the last gene from the history
				if(this.history.length) this.processData(this.history[0]);
      } catch(e) {
        localStorage.removeItem('genes');
      }
    }
	},

	//data hooks
	watch: {
		//self-clear an error message
		error: function(msg){
			if(msg){
				clearTimeout(this.to);
				setTimeout(() => this.error = '', 4000);
			}
		}
	},

	//general functions
	methods: {
		//validate Ensembl gene ID
		checkID: function(){
			if(typeof(this.geneID)!='string' || !this.geneID.length){
				this.error = 'Empty gene ID. Using example data.';
				this.processData(this.example);
			} else if (!/^ENS\w{0,3}G\d{11}$/.test(this.geneID)){
				this.error= 'Gene ID in wrong format!';
			} else {
				this.getData();
			}
		},

		//download gene data from Ensembl
		getData: function(){
			//reset request status
			this.cancel();
			this.busy = true;
			//set up abort switch
			if(window.AbortController) this.req = new AbortController();
			const { signal } = this.req;
			//make REST API request
			fetch('https://rest.ensembl.org/lookup/id/'+this.geneID+'?content-type=application/json;expand=1', {signal})
			.then(response => {
				if(response.ok) return response.json();
				return Promise.reject(response.statusText);
			})
			.then(data => {
				if(data.Transcript){
					//forward data for processing
					this.processData(data);
				} else {
					this.error = 'Error: '+(data.error || 'unexpected API response');
					console.error(data);
				}
			})
			.catch(err => this.error = 'Request failed: '+err)
			.finally(() => this.busy = false);
		},

		//abort REST API request
		cancel: function(){
			if(this.req.abort) this.req.abort();
			this.busy = false;
		},

		//validate & annotate incoming gene data
		processData: function(gene){
			if(gene.id && gene.start && gene.end && gene.Transcript){
				gene.length = gene.end-gene.start+1;
				gene.name = gene.display_name || gene.id;
				gene.info = 'Gene '+gene.id+' | coordinates ';
				gene.info += gene.seq_region_name+':'+gene.start+'..'+gene.end;
			} else {
				this.error = 'Error: corrupt gene data';
				console.error(gene);
				return;
			}
			//scales & rounds data points
			const scale = num => +(num/(gene.length/100)).toFixed(3)+'%';
			//preprocess data for drawing:
			//add element dimensions and metadata
			gene.Transcript = gene.Transcript.map(tr => {
				//parse transcripts
				if(tr.start && tr.end && tr.Exon){
					tr.left = scale(tr.start-gene.start);
					tr.length = tr.end-tr.start+1;
					tr.width = scale(tr.length);
					tr.info = 'Transcript '+tr.display_name+' | length '+tr.length+'bp | ';
					tr.info += (tr.strand == -1? 'reverse' : 'forward')+' strand';
					//parse exons
					tr.Exon = tr.Exon.map(exon => {
						if(exon.start && exon.end){
							exon.left = scale(exon.start-gene.start);
							exon.length = exon.end-exon.start+1;
							exon.width = scale(exon.length);
						} else {
							this.error = 'Error: corrupt exon data';
							console.error(exon);
							exon.left = exon.length = exon.width = 0;
						}
						return exon;
					});
				} else {
					this.error = 'Error: corrupt transcript data';
					console.error(tr);
					tr.left = tr.length = tr.width = 0;
				}
				return tr;
			});
			//forward data for drawing
			this.drawGene(gene);
		},

		//draw a new gene (transcripts)
		drawGene: function(gene){
			//update searchbar
			this.geneID = gene.id;
			//sort & draw processed data
			this.sort(gene);
			this.gene = gene;
			//add gene data to persistent cache
			if(!this.history.some(g => g.id === gene.id)){ //skip duplicates
				this.history.unshift(gene);
				if(this.history.length > 5) this.history.splice(5);
				localStorage.setItem('genes', JSON.stringify(this.history));
			}
		},

		//sort transcripts by length
		sort: function(gene){
			if(!gene || !gene.Transcript) gene = this.gene;
			if(gene.Transcript && gene.Transcript.length){
				gene.Transcript.sort( (a,b) => {
					let res = (a.length < b.length) ? -1 : (a.length > b.length) ? 1 : 0;
					return res * this.order;
				});
			}
		}
	}
});