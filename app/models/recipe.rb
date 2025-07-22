class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_items
  has_many :grocery_items, through: :recipe_items
end

