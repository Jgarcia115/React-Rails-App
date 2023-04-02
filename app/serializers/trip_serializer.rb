class TripSerializer < ActiveModel::Serializer
  attributes :id, :budget

  belongs_to :country
end
