require 'rails_helper'

RSpec.describe "Impersonation", type: :request do
  # Create an admin user and a normal user
  let!(:admin_user) { create(:user, admin: true) }
  let!(:target_user) { create(:user) }
  let!(:normal_user) { create(:user) }

  it "allows admin to impersonate a user" do
    sign_in admin_user
    post "/api/v1/impersonate/#{target_user.id}"
    expect(response).to have_http_status(200)
    expect(json["message"]).to include("You are now impersonating")
  end

  it "returns 403 if not logged in and tries to impersonate" do
    post "/api/v1/impersonate/#{target_user.id}"
    expect(response).to have_http_status(403)
  end

  it "returns 403 if non-admin tries to impersonate" do
    sign_in normal_user
    post "/api/v1/impersonate/#{target_user.id}"
    expect(response).to have_http_status(403)
  end
end
