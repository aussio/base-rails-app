module Api
  class ChatsController < ApplicationController
    def index
      render json: { message: "Hello, world!" }
    end

    def create
      render json: { message: "Hello, world!" }
    end

    def update
      render json: { message: "Hello, world!" }
    end

    def show
      render json: { message: "Hello, world!" }
    end

    def destroy
      render json: { message: "Hello, world!" }
    end
  end
end