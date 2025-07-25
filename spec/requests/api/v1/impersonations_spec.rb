require 'rails_helper'

RSpec.describe "Impersonation", type: :request do
  it "returns 403 if not logged in and tries to impersonate" do
    post "/api/v1/impersonate/1"  # assuming 1 is a user ID
    expect(response).to have_http_status(403)
  end
end
