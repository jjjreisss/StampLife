var Shepherd = require('tether-shepherd');

var makeStampTour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

makeStampTour.addStep('example', {
  text: [
    "Welcome to Salamander. This app lets you make your own stamps,",
    "which you can use to draw with and share with other users."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows'
});

makeStampTour.addStep('pick-color', {
  text: [
    "Click anywhere on the spectrum to choose your color.",
    "Click and drag to watch your color change in real time."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '#color-picker'
});

makeStampTour.addStep('recent-colors', {
  text: [
    "Recently used colors show up here.",
    "Click one to use that color again."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '#color-bar right'
});

makeStampTour.addStep('pick-size', {
  text: [
    "Click anywhere on this sidebar to choose your stroke size."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '#size-picker left'
});

makeStampTour.addStep('mousewheel', {
  text: [
    "You can also use the mousewheel to resize your stroke.",
    "Try hovering over the canvas and watching the sample stroke",
    "get bigger and smaller as you scroll up and down."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '#drawing-canvas'
});

makeStampTour.addStep('save', {
  text: [
    "Once you've drawn what you like, click here to save your",
    "stamp so you can use it later."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.save-to-my-stamps bottom'
});

makeStampTour.addStep('my-stamps', {
  text: [
    "Your active stamps live in this toolbar.",
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    },
    {
      text: 'Next',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.stamp-sidebar'
});

makeStampTour.addStep('get-stamps', {
  text: [
    "But one stamp is not enough... Let's get more!",
    "Click the 'Menu' button, then 'Get Stamps'"
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    }
  ],
  advanceOn: '.get-stamps click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.ghost bottom'
});


module.exports = makeStampTour;
