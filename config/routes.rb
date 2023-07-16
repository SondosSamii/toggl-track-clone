Rails.application.routes.draw do
  get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "sign_up", to: "registration#new"
  post "sign_up", to: "registration#create"

  # Defines the root path route ("/")
  # root "articles#index"
end
