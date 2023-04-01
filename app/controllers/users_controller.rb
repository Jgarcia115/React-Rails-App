class UsersController < ApplicationController
    wrap_parameters format: []
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    private

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity 
    end

    def user_params
        params.permit(:username, :password)
    end

end
