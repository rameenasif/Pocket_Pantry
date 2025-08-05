class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    if user.admin?
      can :manage, :all
    else
      can :manage, Recipe, user_id: user.id
      can :manage, GroceryItem, user_id: user.id
      can :manage, PantryItem, user_id: user.id
      can :manage, Order, user_id: user.id
      can :read, Tenant, id: user.tenant_id
    end
  end

  def current_ability
    @current_ability ||= Ability.new(current_user)
  end
end
