json.extract! @drawing, :id, :content, :caption, :image_url

json.username @drawing.user.username
