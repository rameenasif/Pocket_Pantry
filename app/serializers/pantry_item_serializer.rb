class PantryItemSerializer
  include JSONAPI::Serializer
  attributes :name, :quantity, :user_id
end
