class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.string :country_id
      t.date :date

      t.timestamps
    end
  end
end
