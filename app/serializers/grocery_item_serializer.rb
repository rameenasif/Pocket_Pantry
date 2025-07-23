class GroceryItemSerializer
  include JSONAPI::Serializer
  attributes :name, :user_id
end
