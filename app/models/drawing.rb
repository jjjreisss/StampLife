class Drawing < ActiveRecord::Base
  validates :user_id, :caption, :image_url, presence: true

  belongs_to :user

end
