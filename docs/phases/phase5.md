# Phase 5: Reminders and Garbage Collection

## Rails
### Models
* Comment
* Tag
* Tagging
* Like

### Controllers
(All these controllers are nested under Drawings)
* Api::CommentsController (create, destroy)
* Api::TagsController (create)
* Api::TaggingsController (create, destroy)
* Api::LikesController (create, destroy)

### Views
* comments/index.json.jbuilder (might not need this)

## Flux
### Views (React Components)
* DrawingDetail
  - CommentForm

### Stores
* Comment
* Tag (do I need this?)
* Like (do I need this?)

### Actions
* ApiActions.receiveAllComments -> triggered by ApiUtil
* ApiActions.receiveSingleComment (might not need)
* ApiActions.deleteComment
* CommentActions.fetchAllComments -> triggers ApiUtil
* CommentActions.fetchSingleComment
* CommentActions.createComment
* CommentActions.destroyComment

### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.fetchSingleComment
* ApiUtil.createComment
* ApiUtil.destroyComment

## Gems/Libraries
