class Order < ApplicationRecord
  include Discard::Model

  belongs_to :user
  has_many :order_items
  has_many :grocery_items, through: :order_items
  default_scope { where(tenant_id: Current.tenant_id) }
end
