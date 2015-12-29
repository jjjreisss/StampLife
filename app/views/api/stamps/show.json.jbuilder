json.extract! @stamp, :id, :name, :image_url

json.author @stamp.author.username
json.time_ago time_ago_in_words(@stamp.created_at)
json.stamp_uses @stamp.stamp_uses.map {|use| User.find(use[user_id]).username}
