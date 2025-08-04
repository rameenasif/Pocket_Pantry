require 'rails_helper'
RSpec.describe 'Multi-tenancy (Users)' do
  let!(:tenant1) { create(:tenant) }
  let!(:tenant2) { create(:tenant) }
  let!(:user1) { create(:user, tenant: tenant1) }
  let!(:user2) { create(:user, tenant: tenant2) }

  it 'ensures users are scoped to their own tenant' do
    Current.tenant_id = tenant1.id
    users = User.where(tenant_id: Current.tenant_id)

    expect(users).to include(user)
    expect(users).not_to include(user2)
  end
end
