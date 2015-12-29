json.array! @stamps do |stamp|
  json.extract! stamp, :id, :name, :image_url

  json.author stamp.author.username
  json.time_ago time_ago_in_words(stamp.created_at)

  stamp_users = stamp.stamp_uses.map do |use|
    user = User.where(id: use.user_id).first
    user ? user.username : "user unknown"
  end
puts stamp_users

  json.stamp_uses stamp_users

end
