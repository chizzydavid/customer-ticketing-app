Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get 'posts', :to => 'posts#index'

    namespace :auth do
      post 'signup', to: 'users#signup'
      post 'login', to: 'authentication#authenticate'
    end
  end
  root 'static#index'
  get '/*path' => 'static#index'

end
