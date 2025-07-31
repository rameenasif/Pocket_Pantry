require 'rails_helper'

RSpec.describe "Api::V1::Recipes", type: :request do
  let!(:user) { create(:user) }
  let!(:headers) { user.create_new_auth_token }

  describe "GET /api/v1/recipes" do
    it "returns 403 if not logged in" do
      get "/api/v1/recipes"
      expect(response).to have_http_status(403)
    end

    it "returns 200 and recipes when logged in" do
      create(:recipe, name: "Pizza", user: user, tenant: user.tenant)

      get "/api/v1/recipes", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to include("Pizza")
    end

    it "returns 200 and empty array if no recipes exist" do
      get "/api/v1/recipes", headers: headers
      expect(response).to have_http_status(200)
      expect(response.body).to eq("[]")
    end
  end
end
