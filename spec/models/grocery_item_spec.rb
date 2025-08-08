require 'rails_helper'

RSpec.describe GroceryItem, type: :model do
  describe 'associations' do
    it { should have_many(:recipe_items) }
    it { should have_many(:recipes).through(:recipe_items) }
  end
end
