class Api::PostsController < ApplicationController
  def index
    render json: {
      :posts => [
        {
          :userId => 1,
          :id => 2,
          :title => "qui est esse",
          :body => "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        },
        {
          :userId => 2,
          :id => 2,
          :title => "qui est esse",
          :body => "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        }        
      ]
    }
  end
end
