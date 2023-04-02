class Trip < ApplicationRecord
    belongs_to :user
    belongs_to :country
    validates :budget, :numericality: {only_integer: true}
end