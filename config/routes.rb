Rails.application.routes.draw do
  resources :comments, only: [:post]
  resources :posts
  resources :users
  get '/me', to: "users#show"
  post "/login", to: "users#login"
  delete "/logout", to: "sessions#destroy"
  get "/comments/:post_id", to: "comments#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
