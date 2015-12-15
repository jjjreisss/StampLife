class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.string :caption, null: false, default: ""
      t.integer :user_id, null: false
      t.string :content, null: false, default: ""
      t.boolean :archived, null: false, default: false
      t.string :image_url, null: false, default: ""

      t.timestamps null: false
    end
  end
end
