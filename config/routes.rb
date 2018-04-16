Rails.application.routes.draw do
  
  root 'home#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  resources :fragments, only: [:index, :show, :destroy]

  resources :book_marks
  
  resources :books do 
    resources :fragments
  end

  get '/team', to: 'home#team', as: 'team'
  get '/store', to: 'home#store', as: 'store'
end
