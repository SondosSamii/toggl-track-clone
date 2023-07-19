Rails.application.routes.draw do
  resources :projects do
    resources :tasks
  end
  resources :tasks
  devise_for :users

  # add the following route for sign out
  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'projects#index'

  # Defines the root path route ("/")
  # root "articles#index"
end
