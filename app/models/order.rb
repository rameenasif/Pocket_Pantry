class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items
  has_many :grocery_items, through: :order_items
end
