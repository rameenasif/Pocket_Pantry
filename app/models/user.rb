class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  belongs_to :tenant
  has_many :pantry_items
  has_many :orders
  has_many :recipes
  def admin?
    role =="admin"
  end
end
