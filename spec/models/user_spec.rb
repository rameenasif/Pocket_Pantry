require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it "belongs to a tenant" do
      user = build(:user)
      expect(user.tenant).to be_present
    end
  end

  describe "validations" do
    it "is valid with valid attributes" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "is invalid without an email" do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
    end
  end
end
