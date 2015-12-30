Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :static_pages, only: [:root]
  namespace :api, defaults: {format: :json} do
    resources :drawings, only: [:index, :new, :create, :destroy, :edit, :show]
    resources :images
    resources :stamps, only: [:index, :new, :create, :destroy, :show]
    resources :stamp_uses, only: [:create]
    resources :likes, only: [:create, :destroy]
  end
end
