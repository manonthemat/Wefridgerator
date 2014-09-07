Wefridgerator::Application.routes.draw do
  get "invitees/new"
  root 'users#new'

  resources :users

  resource :session, only: [:new, :create, :destroy]

  resources :static_pages

  post "categories/:category_id/items/:id/update" => "items#update_item", as: :update_item
  get "categories/:id/items/new_item" => "items#new_container_item", as: :new_container_item
  get "categories/:id/items/new_sl" => "items#new_shopping_list_item", as: :new_shopping_list_item
  # get "categories/api/"  => "categories#nothing"
  get "groups/:id/api/items" => "categories#item_json"
  #delete "containers/:id/api/items" => "items#destroy"
  delete "categories/:category_id/items/:id" => "items#destroy"
  post "categories/:id/items/speech" => "items#create_speech", as: :new_speech_item


  resources :groups do
    resources :invitees
    resources :user_groups
    resources :receipts
    resources :categories
    resources :arts
    resources :messages
  end

  resources :categories do
    resources :items, only: [:index, :show, :create, :edit, :update, :destroy]
  end

  get 'recipes' => 'recipes#index'
  post 'recipesapi/search' => 'recipes#search_with_items_in_wefridgerator'
  get 'recipesapi/get/:id' => 'recipes#get_recipe'
  get 'test' => 'recipes#inc'

  get '/freezer/:fresh/:freezer' => 'freezers#postTemp' # route that node.js uses to update the stored temperature values
  get '/freezer' => 'freezers#getTemp' # route that should be consumed on the front-end by angular
end
