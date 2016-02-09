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

// makeStampTour.addStep('save', {
//   text: [
//     "Once you've drawn what you like, click here to save your",
//     "stamp so you can use it later."
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     },
//     {
//       text: 'Next',
//       action: makeStampTour.next
//     }
//   ],
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.save-to-my-stamps bottom'
// });

makeStampTour.addStep('my-stamps', {
  text: [
    "Your active stamps live in this toolbar.",
    "Click one to use it in your drawing.",
    "Use the mousewheel to make it bigger and smaller."
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

// makeStampTour.addStep('get-stamps', {
//   text: [
//     "But one stamp is not enough... Let's get more!",
//     "Click the 'Menu' button, then 'Get Stamps'"
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     }
//   ],
//   advanceOn: '.get-stamps click',
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.dropdown-toggle bottom'
// });


// makeStampTour.addStep('sort-stamps', {
//   text: [
//     "This page contains all the stamps from all the site's users.",
//     "Sort stamps by popularity or by when they were made.",
//     "Click on a stamp to add it to your stamp toolbar.",
//     "Your toolbar can hold up to five stamps."
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     },
//     {
//       text: 'Next',
//       action: makeStampTour.next
//     }
//   ],
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.dropdown-toggle bottom'
// });

// makeStampTour.addStep('stamp-detail', {
//   text: [
//     "Click the field in the upper left to see who has used a certain stamp.",
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     },
//     {
//       text: 'Next',
//       action: makeStampTour.next
//     }
//   ],
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.index-element'
// });

// makeStampTour.addStep('done-choosing-stamps', {
//   text: [
//     "Once you have all the stamps you want to use in your drawing,",
//     "click 'Menu', then 'New Drawing'."
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     }
//   ],
//   advanceOn: '.new-drawing click',
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.dropdown-toggle bottom'
// });

// makeStampTour.addStep('select-stamp', {
//   text: [
//     "When making a drawing, you can do everything you could when",
//   ],
//   showCancelLink: true,
//   buttons: [
//     {
//       text: 'Next',
//       action: makeStampTour.next
//     }
//   ],
//   classes: 'shepherd-theme-arrows',
//   attachTo: '.stamp-sidebar'
// });

// makeStampTour.addStep('turn-stamping-on', {
//   text: [
//     "After selecting a stamp, click here to turn stamping on, then go",
//     "over to the canvas and use your stamp!",
//     "Just like before, use the mousewheel to make it bigger and smaller."
//   ],
//   buttons: [
//     {
//       text: 'Back',
//       action: makeStampTour.back
//     },
//     {
//       text: 'Next',
//       action: makeStampTour.next
//     }
//   ],
//   showCancelLink: true,
//   classes: 'shepherd-theme-arrows',
//   attachTo: '#toggle-stamping bottom'
// });

makeStampTour.addStep('save-drawing', {
  text: [
    "When you're satisfied, save your drawing."
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
  advanceOn: '.save-drawing click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.save-drawing bottom'
});

makeStampTour.addStep('save-drawing', {
  text: [
    "Then go to the Menu and check out 'All Drawings'",
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: makeStampTour.back
    }
  ],
  advanceOn: '.all-drawings click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.dropdown-toggle bottom'
});

makeStampTour.addStep('drawing-index', {
  text: [
    "Feel free to check out other users' drawings, see who has been liking",
    "what, and visit other users' profile pages.",
    "You can also make your own stamps, and browse other users' stamps."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Finish',
      action: makeStampTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.dropdown-toggle bottom'
});

module.exports = makeStampTour;
