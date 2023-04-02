class CountriesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        user = User.find_by(id: session[:user_id])
        if user
            countries = Country.all
            render json: countries, status: :created
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            country = Country.create!(countries_params)
            render json: country, status: :created
        else
            render  json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    private

    def countries_params
        params.permit(:name, :continent)
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
