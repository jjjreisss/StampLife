# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: Ain'tNoWebsiteBih

## Minimum Viable Product

TransGram is a web application inspired by Instagram built using Ruby on Rails
and React.js. TransGram allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Draw pictures and post with caption
- [ ] Apply filters to pictures
- [ ] Edit and delete posts
- [ ] Maintain a profile page with all a users posted pictures
- [ ] Edit profile
- [ ] Tag pictures with multiple tags
- [ ] Search pictures by tag
- [ ] Search by username
- [ ] Comment on and like other users' pictures
- [ ] Main page has a feed of all recent posts


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Drawing Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using BCrypt). There will be a basic landing page after signup that will contain the container for the application's root React component. Before building out the front end, I will begin by setting up a full JSON API for drawings.

[Details][phase-one]

### Phase 2: Flux Architecture and Drawing CRUD (1.5 days)

Phase 2 is focused on setting up Flux and the React view structure for the creation of a new drawing. After the basic Flux architecture has been set up, a Drawing store will be implemented and a set of actions corresponding to the needed CRUD functionality created. At this point, the 'DrawingForm' component will consist only of a blank canvas and an empty drawing tool, and each drawing will be saved with the same image. After being persisted to the database, a drawing will be able to be viewed by visiting its 'DrawingDetail' view. At the end of Phase 2, blank Drawings can be created, read, edited (just the caption) and destroyed in the browser.

[Details][phase-two]

### Phase 3: Drawing Canvas (2 days)

Phase 3 will be focused on fleshing out the basic functionality of the DrawingForm.
A user will be able to draw on the canvas, select color, brush texture, and apply filters to their drawing. Upon completion, the drawing will be uploaded and the its image_url will be assigned accordingly.

[Details][phase-three]

### Phase 4: Remaining Flux/React, including Routes (1.5 days)

Phase 4 will contain most of the remaining React and Flux infrastructure. React views for 'DrawingIndex', 'DrawingsView', 'DrawingListItem', 'DrawingDetail', and 'ProfilePage', and 'UserDetails' will be made. The structure for the React Routes will also be made. In this part, the three main pages will emerge (DrawingIndex, DrawingForm, and ProfilePage), and the user can navigate through the website.

[Details][phase-four]

### Phase 5: Comments, Tags, Likes (1.5 day)

In Phase 5 I'll add Comments and Likes to the Drawings. Each of these will require MVC architecture including JSON API. Drawings can be tagged, comments can be added (via 'DrawingDetail'), and drawings can be liked (via 'DrawingListItem' or 'DrawingDetail'). Search will also be possible, either by tag or by username.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes.

[Details][phase-six]

### BONUS Phase 7: Followers, Edit Profile, Garbage Collection (1 day)

In Phase 7 I'll implement follower functionality. Users will be able to follow other users, and the feed on their main page will be populated by posts from the users that they follow. A user will also be able to edit their own profile.

[Details][phase-seven]

### BONUS Phase 8: Photographs, maps, filter pen

[Details][phase-eight]

Add more functionality to the Drawing Form by allowing users to upload and draw on photos, draw on a map of their current location, and apply filters selectively with a "filter pen".

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
