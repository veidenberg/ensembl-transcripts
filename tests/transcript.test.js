/*
Unit tests for the transcript Vue module
*/

//import the mount() method from Vue Test Utils
import { mount } from '@vue/test-utils'
//import the Transcript component
const Transcript = require('../transcript.js')
//import test gene data
const gene = require('../example_gene.json')

//mount the component to a wrapper
const wrapper = mount(Transcript, { propsData: gene });

//Test specifications
describe('Transcript', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('renders a transcript element', () => {
    expect(wrapper.find('.transcript').exists()).toBe(true)
  })
  it('renders an exon element', () => {
    expect(wrapper.find('.exon').exists()).toBe(true)
  })
  it('renders a transcript ', () => {
    expect(wrapper.findAll('[data-test-id="star"]').length).toEqual(6)
  })
});