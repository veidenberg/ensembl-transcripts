/*
Unit tests for the transcript Vue module
*/
//import Vue and its testing library
const Vue = require('vue');
const testUtils = require('@vue/test-utils');
//import the wepapp component
const Transcript = require('../transcript.js');
//import some test data
const gene = require('../example_gene.json');
const testData = gene.Transcript[0];

//mount the component to a wrapper
const wrapper = testUtils.mount(Vue.component('transcript', Transcript), { propsData: testData });
//const wrapper = mount(Transcript, { propsData: gene });
console.log(wrapper.html());

//tests
describe('Transcript', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders a transcript element', () => {
    expect(wrapper.find('.transcript').exists()).toBeTruthy()
  })
  it('renders an exon element', () => {
    expect(wrapper.findAll('.exon').length).toEqual(6)
  })
});