require 'rails_helper'

RSpec.describe "Api::V1::PantryItems", type: :request do
  let!(:user) { create(:user) }
  let!(:headers) { user.create_new_auth_token }

  describe "GET /api/v1/pantry_items" do
    it "returns 403 if not logged in" do
      get "/api/v1/pantry_items"
      expect(response).to have_http_status(403)
    end

    it "returns 200 and pantry items when logged in" do
      create(:pantry_item, name: "Flour", user: user, tenant: user.tenant)

      get "/api/v1/pantry_items", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to include("Flour")
    end

    it "returns 200 and empty array if no pantry items exist" do
      get "/api/v1/pantry_items", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to eq("[]")
    end
  end
end
