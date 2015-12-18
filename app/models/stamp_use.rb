class StampUse < ActiveRecord::Base
  validates :stamp_id, :user_id, presence: true

  belongs_to :user

  belongs_to :stamp
  
end
