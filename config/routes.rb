Rails.application.routes.draw do
  resources :books
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  
  root 'home#index'

  get '/team', to: 'home#team', as: 'team'
  get '/store', to: 'home#store', as: 'store'


end
