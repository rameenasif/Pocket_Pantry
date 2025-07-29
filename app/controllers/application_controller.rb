class ApplicationController < ActionController::API
  respond_to :json
  before_action :authenticate_user!
  before_action :set_current_user_and_tenant
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    render json: { error: "Access denied" }, status: :forbidden
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :tenant_id ])
  end

  private

  def set_current_user_and_tenant
    if current_user
      Current.user = current_user
      Current.tenant_id = current_user.tenant_id
    end
  end
end
