class Trip < ApplicationRecord
    belongs_to :user
    belongs_to :country
    validates :date, presence: true
end