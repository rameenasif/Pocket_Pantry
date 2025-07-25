class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        render json: { message: "Signed up successfully", user: resource }, status: :created
      else
        render json: { message: "Signed up but inactive", user: resource }, status: :created
      end
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
