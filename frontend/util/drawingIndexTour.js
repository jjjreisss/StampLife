var Shepherd = require('tether-shepherd');

var drawingIndexTour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

drawingIndexTour.addStep('save-drawing', {
  text: [
    "Feel free to check out other users' drawings, see who has been liking",
    "what, and visit other users' profile pages."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Finish',
      action: drawingIndexTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.dropdown-toggle bottom'
});

module.exports = drawingIndexTour;
