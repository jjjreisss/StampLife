class CreateStampUses < ActiveRecord::Migration
  def change
    create_table :stamp_uses do |t|
      t.integer :stamp_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
