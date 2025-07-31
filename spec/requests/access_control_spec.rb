require 'rails_helper'

RSpec.describe "Access Control", type: :request do
  let(:tenant) { create(:tenant) }
  let(:admin) { create(:user, :admin, tenant: tenant) }
  let(:user) { create(:user, :regular, tenant: tenant) }
  it "allows a regular user to access recipes" do
    sign_in user
    get "/api/v1/recipes"
    expect(response).to be_successful
  end

  it "allows admin to access recipes" do
    sign_in admin
    get "/api/v1/recipes"
    expect(response).to be_successful
  end

  it "allows only admin to impersonate" do
    sign_in admin
    post "/admin/impersonate/#{user.id}"
    expect(response).to be_successful
  end

  it "blocks regular user from impersonating" do
    sign_in user
    post "/admin/impersonate/#{admin.id}"
    expect(response).to be_unauthorized.or be_forbidden
  end
end
