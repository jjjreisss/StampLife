Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :drawings, only: [:index, :new, :create, :destroy, :edit, :show]
    resources :images
    resources :stamps, only: [:index, :new, :create, :destroy, :show]
  end
end
