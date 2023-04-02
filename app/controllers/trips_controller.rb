class TripsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        user = User.find_by(id: session[:user_id])
        if user
            trips = user.trips
            render json: trips
        else
            render  json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            trip = user.trips.create!(trip_params)
            render json: trip, status: :created
        else
            render  json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            trip = Trip.find(params[:id])
            trip.update(
                budget: params[:budget]
            )
            render json: trip, status: :created
        else
            render  json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            trip = Trip.find(params[:id])
            trip.delete
            head :no_content
        else
            render  json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    private

    def trip_params
        params.permit(:budget, :user_id, :country_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: {errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
