class Current < ActiveSupport::CurrentAttributes
  attribute :user, :tenant_id
end
