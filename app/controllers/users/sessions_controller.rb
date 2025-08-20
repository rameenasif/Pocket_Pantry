# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    before_action :configure_sign_in_params, only: [:create]
    respond_to :json

    private

    def set_flash_message!(*_args); end

    def respond_with(resource, _opts = {})
      token = request.env["warden-jwt_auth.token"]
      
      if token.present?
        render json: {
          message: "Logged in successfully",
          user: {
            id: resource.id,
            name: resource.name,
            email: resource.email
          },
          token: token
        }, status: :ok
      else
        render json: { error: "Authentication failed" }, status: :unauthorized
      end
    end

    def respond_to_on_destroy
      if current_user
        render json: { message: "Logged out successfully" }, status: :ok
      else
        render json: { message: "No active session" }, status: :unauthorized
      end
    end

    protected

    def configure_sign_in_params
      devise_parameter_sanitizer.permit(:sign_in, keys: [:tenant_id])
    end
  end
end
