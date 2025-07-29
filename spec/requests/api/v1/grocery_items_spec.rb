require 'rails_helper'

RSpec.describe "Api::V1::Groceries", type: :request do
  describe "GET /api/v1/groceries" do
    it "returns 403 if not logged in" do
      get "/api/v1/groceries"
      expect(response).to have_http_status(403)
    end
  end
end
