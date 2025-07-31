class OrderItem < ApplicationRecord
  include Discard::Model

  belongs_to :order
  belongs_to :grocery_item
  default_scope { where(tenant_id: Current.tenant_id) }
end
