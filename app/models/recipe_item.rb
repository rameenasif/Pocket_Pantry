class RecipeItem < ApplicationRecord
  belongs_to :recipe
  belongs_to :grocery_item
end
