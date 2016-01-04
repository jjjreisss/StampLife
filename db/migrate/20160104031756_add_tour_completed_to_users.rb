class AddTourCompletedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tour_one_completed, :boolean, null: false, default: false
    add_column :users, :tour_two_completed, :boolean, null: false, default: false
    add_column :users, :tour_three_completed, :boolean, null: false, default: false
    add_column :users, :tour_four_completed, :boolean, null: false, default: false
  end
end
