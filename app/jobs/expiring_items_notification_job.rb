class ExpiringItemsNotificationJob < ApplicationJob
  queue_as :default

  def perform
    User.find_each do |user|
      expiring_items = user.pantry_items.where("expiry_date <= ?", 3.days.from_now)

      PantryMailer.expiration_warning(user, expiring_items).deliver_later if expiring_items.any?
    end
  end
end
