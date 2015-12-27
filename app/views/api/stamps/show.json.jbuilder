json.extract! @stamp, :id, :name, :image_url

json.author @stamp.author.username
json.time_ago time_ago_in_words(@stamp.created_at)
