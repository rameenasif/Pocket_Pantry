require "rails_helper"

Rspec.describe Recipe, type: :model do
  it { should belong_to(:tenant) }
  it { should belong_to(:user) }
  it { should have many(:recipe_items)
  it { should have many(:grocery_items).through(:recipe_items) }
}
end
