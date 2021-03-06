# json.extract! @drawing, :id, :content, :caption, :image_url
#
# json.username @drawing.user.username
# json.time_ago time_ago_in_words(@drawing.created_at)

json.extract! @drawing, :id, :content, :caption, :image_url

json.username @drawing.user.username
json.time_ago time_ago_in_words(@drawing.created_at)

likes = @drawing.likes.map do |like|
  liker = User.where(id: like.user_id).first
  liker ? liker.username : "user unknown"
end

json.likes likes

json.created_at @drawing.created_at

json.liked_by_current_user likes.include?(current_user.username)

current_like = Like.find_by(user_id: current_user.id, drawing_id: @drawing.id)

if current_like
  json.current_like_id current_like.id
end
