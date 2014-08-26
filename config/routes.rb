Wefridgerator::Application.routes.draw do
  root 'users#new'

  resources :users
  resources :sessions
  resources :shopping_lists


  get "categories/api"  => "categories#nothing"
  get "categories/api/:s" => "categories#check_anagram"

  resources :groups do
    resources :containers
  end

  resources :containers do
    resources :categories
  end

  resources :categories do
    resources :items 
  end

  resources :groups do
    resources :receipts
  end

  resources :groups do
    resources :chat_rooms
  end

  resources :chat_rooms do
    resources :messages
  end

  resources :conatiners do
    resources :arts
  end

end
