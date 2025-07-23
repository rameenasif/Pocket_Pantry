class User < ApplicationRecord
  belongs_to :tenant
  has_many :pantry_items
  has_many :orders
  has_many :recipes

end
