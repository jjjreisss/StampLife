class Stamp < ActiveRecord::Base
  validates :name, :image_url, :author_id, presence: true

  belongs_to :author,
    class_name: "User"

  has_many :stamp_uses

  has_many :users,
    through: :stamp_uses
end
