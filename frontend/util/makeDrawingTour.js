var Shepherd = require('tether-shepherd');

var makeDrawingTour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

makeDrawingTour.addStep('select-stamp', {
  text: [
    "When making a drawing, you can do everything you could when",
    "making a stamp.",
    "You can also select a stamp to USE by clicking on it down here."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Next',
      action: makeDrawingTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.stamp-sidebar'
});

makeDrawingTour.addStep('turn-stamping-on', {
  text: [
    "After selecting a stamp, click here to turn stamping on, then go",
    "over to the canvas and use your stamp!",
    "Just like before, use the mousewheel to make it bigger and smaller."
  ],
  buttons: [
    {
      text: 'Back',
      action: makeDrawingTour.back
    },
    {
      text: 'Next',
      action: makeDrawingTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '#toggle-stamping bottom'
});

makeDrawingTour.addStep('save-drawing', {
  text: [
    "When you're satisfied, save your drawing."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeDrawingTour.back
    },
    {
      text: 'Next',
      action: makeDrawingTour.next
    }
  ],
  advanceOn: '.save-drawing click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.save-drawing bottom'
});

makeDrawingTour.addStep('save-drawing', {
  text: [
    "Then go to the Menu and check out 'All Drawings'",
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeDrawingTour.back
    }
  ],
  advanceOn: '.all-drawings click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.ghost bottom'
});


module.exports = makeDrawingTour;
