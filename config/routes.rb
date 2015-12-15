Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api do
    resources :drawings, only: [:index, :new, :create, :destroy, :edit]
  end
end
