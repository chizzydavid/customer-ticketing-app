Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :auth do
      post 'signup', to: 'users#signup'
      post 'login', to: 'authentication#authenticate'
    end
    resources :tickets, except: [:new, :edit] do
      resources :comments, only: [:index, :create, :destroy]
    end

    match '*path' => 'root#unknown_route', :via => :all
  end
  root 'static#index'
  get '/*path' => 'static#index'

end
