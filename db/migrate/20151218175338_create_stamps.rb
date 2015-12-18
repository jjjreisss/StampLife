class CreateStamps < ActiveRecord::Migration
  def change
    create_table :stamps do |t|
      t.string :image_url, null: false
      t.integer :author_id, null: false
      t.string :name, null: false, default: ""

      t.timestamps null: false
    end
  end
end
