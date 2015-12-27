json.extract! @drawing, :id, :content, :caption, :image_url

json.username @drawing.user.username
json.time_ago time_ago_in_words(@drawing.created_at)
