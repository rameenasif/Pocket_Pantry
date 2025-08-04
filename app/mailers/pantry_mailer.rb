class PantryMailer < ApplicationMailer
  def expiration_warning(user, items)
    @user = user
    @items = items

    mail(to: @user.email, subject: "Pantry Items Expiring Soon")
  end
end
