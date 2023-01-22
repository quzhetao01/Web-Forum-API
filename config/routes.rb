Rails.application.routes.draw do
  get 'categories', to: "categories#show"
  resources :comments, only: [:create]
  resources :posts
  resources :users
  get '/me', to: "users#show"
  post "/login", to: "users#login"
  get "/posts/search/:search", to: "posts#showSearch"
  get "/posts/category/:id", to: "posts#showCategory"
  get "/comments/:post_id", to: "comments#show"
  patch "/comments/:comment_id", to: "comments#update"  
  delete "/comments/:comment_id", to: "comments#destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
