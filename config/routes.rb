Rails.application.routes.draw do
  resources :fragments
  root 'home#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  resources :book_marks
  resources :books

  get '/team', to: 'home#team', as: 'team'
  get '/store', to: 'home#store', as: 'store'
end
