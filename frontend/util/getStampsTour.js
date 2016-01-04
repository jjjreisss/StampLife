var Shepherd = require('tether-shepherd');

var getStampsTour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

getStampsTour.addStep('sort-stamps', {
  text: [
    "This page contains all the stamps from all the site's users.",
    "Sort stamps by popularity or by when they were made.",
    "Click on a stamp to add it to your stamp toolbar.",
    "Your toolbar can hold up to five stamps."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: getStampsTour.back
    },
    {
      text: 'Next',
      action: getStampsTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.dropdown-toggle bottom'
});

getStampsTour.addStep('stamp-detail', {
  text: [
    "Click the field in the upper left to see who has used a certain stamp.",
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: getStampsTour.back
    },
    {
      text: 'Next',
      action: getStampsTour.next
    }
  ],
  classes: 'shepherd-theme-arrows',
  attachTo: '.index-element'
});

getStampsTour.addStep('sort-stamps', {
  text: [
    "Once you have all the stamps you want to use in your drawing,",
    "click 'Menu', then 'New Drawing'."
  ],
  showCancelLink: true,
  buttons: [
    {
      text: 'Back',
      action: getStampsTour.back
    }
  ],
  advanceOn: '.new-drawing click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.dropdown-toggle bottom'
});

module.exports = getStampsTour;
