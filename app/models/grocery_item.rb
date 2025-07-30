class GroceryItem < ApplicationRecord
  has_many :recipe_items
  has_many :recipes, through: :recipe_items
  default_scope { where(tenant_id: Current.tenant_id) }
end
