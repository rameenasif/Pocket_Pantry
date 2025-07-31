require 'rails_helper'

RSpec.describe "Api::V1::Groceries", type: :request do
  let!(:user) { create(:user) }
  let!(:headers) { user.create_new_auth_token }

  describe "GET /api/v1/groceries" do
    it "returns 403 if not logged in" do
      get "/api/v1/groceries"
      expect(response).to have_http_status(403)
    end

    it "returns 200 and groceries when logged in" do
      create(:grocery_item, name: "Milk", user: user, tenant: user.tenant)

      get "/api/v1/groceries", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to include("Milk")
    end

    it "returns 200 and empty array if no groceries exist" do
      get "/api/v1/groceries", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to eq("[]")
    end
  end
end
