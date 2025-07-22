class FixPantryItemsTable < ActiveRecord::Migration[8.0]
  def change
    remove_column :pantry_items, :integer, :integer if column_exists?(:pantry_items, :integer)
  end
end
