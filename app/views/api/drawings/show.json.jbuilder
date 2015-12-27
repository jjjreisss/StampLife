json.extract! @drawing, :id, :content, :caption, :image_url, :created_at

json.username @drawing.user.username
