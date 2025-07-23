class RecipeSerializer
  include JSONAPI::Serializer
  attributes :instructions, :user_id
end
