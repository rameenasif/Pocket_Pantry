class Admin::ImpersonationController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_admin!

  def impersonate
    user = User.find(params[:id])
    session[:admin_id] = current_user.id
    sign_in(:user, user)

    Rails.logger.info "Admin id: Admin ID=#{session[:admin_id]} Admin impersonation id#{user.id}"

    render json: { message: "Now impersonating #{user.email}" }
  end
  def stop
    admin = User.find(session[:admin_id])
    sign_in(:user, admin)
    session.delete(:admin_id)

    Rails.logger.info "Back as Admin ID=#{admin.id}"

    render json: { message: "Stopped impersonating. Back as #{admin.email}" }
  end

  private

  def ensure_admin!
    unless current_user.role == "admin"
      render json: { error: "Access denied: only admins can impersonate" }, status: :unauthorized
    end
  end
end
