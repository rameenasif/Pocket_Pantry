class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :grocery_item
end
