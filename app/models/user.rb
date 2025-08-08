class User < ApplicationRecord
  include Discard::Model
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  belongs_to :tenant
  has_many :pantry_items
  has_many :orders
  has_many :recipes

  default_scope { where(tenant_id: Current.tenant_id) }

  def admin?
    role =="admin"
  end

  def regular?
    role=="user"
  end
end
