class AddTourCompletedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tour_completed, :boolean, null: false, default: false
  end
end
