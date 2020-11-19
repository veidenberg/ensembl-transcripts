/*
Unit tests for the "transcript" component
*/
//import testing tools
const testlib = require('@testing-library/vue');
const render = testlib.render;
require('@testing-library/jest-dom');
//import the component
const Transcript = require('../transcript.js');
//test transcript data (condensed)
const tr = {
  strand: -1,
  left: '10%',
  width: '80%',
  info: 'Transcript BRCA 2-201 | 84761bp | forward strand',
  Exon: [
    { left: '2%', width: '10%'}, { left: '15%', width: '20%' }
  ]
};

//mount the component
const {container, html} = render(Transcript, {props: {data: tr}});

//test the transcript element
const root = container.firstChild;
test('transcript element has correct class', () => {
  expect(root).toHaveClass('transcript rev');
});
test('transcript element has correct title', () => {
  expect(root).toHaveAttribute('title', tr.info);
});
test('transcript line element has correct dimensions', () => {
  expect(root.firstChild).toHaveStyle({left: tr.left, width: tr.width});
});

//test the exon elements
const exons = root.querySelectorAll('.exon');
test('transcript element has two children', () => {
  expect(exons.length).toEqual(2);
})
test('exon element has correct dimensions', () => {
  expect(exons[0]).toHaveStyle({left: tr.Exon[0].left, width: tr.Exon[0].width});
});