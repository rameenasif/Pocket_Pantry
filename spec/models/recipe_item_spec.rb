require 'rails_helper'

RSpec.describe RecipeItem, type: :model do
  describe 'associations' do
    it { should belong_to(:recipe) }
    it { should belong_to(:grocery_item) }
  end
end
