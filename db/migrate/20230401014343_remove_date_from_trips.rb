class RemoveDateFromTrips < ActiveRecord::Migration[6.1]
  def change
    remove_column :trips, :date
  end
end
