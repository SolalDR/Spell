Rails.application.routes.draw do
  
  root 'home#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  resources :fragments, only: [:index, :show, :destroy]

  resources :book_marks
  get 'book_marks/:id/box', to: 'book_marks#sandbox', as: :book_marks_box
  
  resources :books do 
    resources :fragments
    resources :words, only: [:index]
  end

  get 'books/:id/tree', to: 'books#tree', as: :tree
  get 'books/:id/read', to: 'book_marks#read', as: :read

  get '/team', to: 'home#team', as: 'team'
  get '/store', to: 'home#store', as: 'store'

  get '/books/:id/add_book_mark', to: 'book_marks#add_from_book', as: :add_book_mark

  post '/book_marks/:id/edit_config', to: 'book_marks#update_config', as: :book_marks_update_config

end
