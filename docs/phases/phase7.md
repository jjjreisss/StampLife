# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Follow

### Controllers
* Api::FollowsController (create, destroy)

### Views

## Flux
### Views (React Components)
* ProfilePage

### Stores
* Follow

### Actions
* ApiActions.receiveAllFollows -> triggered by ApiUtil
* ApiActions.deleteFollow
* FollowActions.fetchAllFollows -> triggers ApiUtil
* FollowActions.fetchSingleFollow (for deleting?)
* FollowActions.createFollow
* FollowActions.destroyFollow

### ApiUtil
* ApiUtil.fetchAllFollows
* ApiUtil.fetchSingleFollow (for deleting?)
* ApiUtil.createFollow
* ApiUtil.destroyFollow

## Gems/Libraries
