class Stamp < ActiveRecord::Base
  validates :name, :image_url, :author_id, presence: true

  belongs_to :author,
    classname: "User"

  has_many :stamp_uses

  has_many :users,
    through: :stamp_uses
end
