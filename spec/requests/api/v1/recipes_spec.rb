require 'rails_helper'

RSpec.describe "Api::V1::Recipes", type: :request do
  describe "GET /api/v1/recipes" do
    it "returns 403 if not logged in" do
      get "/api/v1/recipes"
      expect(response).to have_http_status(403)
    end
  end
end
