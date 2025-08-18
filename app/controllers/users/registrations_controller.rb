# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      build_resource(sign_up_params)

      if resource.save
        sign_up(resource_name, resource)
        render json: {
          message: "Signed up successfully",
          user: resource
        }, status: :created
      else
        render json: {
          message: "Sign up failed",
          errors: resource.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    private

    def set_flash_message!(*_args); end

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {
          message: "Signed up successfully",
          user: resource
        }, status: :created
      else
        render json: {
          message: "Sign up failed",
          errors: resource.errors.full_messages
        }, status: :unprocessable_entity
      end
    end
  end
end
