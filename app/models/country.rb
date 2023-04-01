class Country < ApplicationRecord
    has_many :trips
    has_many :users, through: :trips
    validates :name, uniqueness: true, presence: true
end 