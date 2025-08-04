class PantryItem < ApplicationRecord
  include Discard::Model

  belongs_to :user
  default_scope { where(tenant_id: Current.tenant_id) }
end
