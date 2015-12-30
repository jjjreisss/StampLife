class Like < ActiveRecord::Base
  validates :user_id, :drawing_id, presence: true

  belongs_to :drawing
end
