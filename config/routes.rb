Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  devise_scope :user do
    post "/login", to: "users/sessions#create"
    delete "/logout", to: "users/sessions#destroy"
  end

  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  namespace :api do
    namespace :v1 do
      resources :recipes
      resources :pantry_items
      resources :groceries
    end
  end

  namespace :admin do
    post "impersonate/:id", to: "impersonation#impersonate", as: "impersonate"
    delete "stop_impersonating", to: "impersonation#stop", as: "stop_impersonating"
  end
end
