module Api
  module V1
    class GroceriesController < ApplicationController
      before_action :set_grocery, only: [ :show, :update, :destroy ]

      def index
        @groceries = GroceryItem.page(params[:page]).per(5)
        render json: GroceryItemSerializer.new(@groceries, {
          meta: {
            current_page: @groceries.current_page,
            next_page: @groceries.next_page,
            prev_page: @groceries.prev_page,
            total_pages: @groceries.total_pages,
            total_count: @groceries.total_count
          }
        }).serializable_hash
      end

      def show
        render json: GroceryItemSerializer.new(@grocery).serializable_hash.to_json
      end

      def create
        @grocery = GroceryItem.new(grocery_params)
        if @grocery.save
          render json: GroceryItemSerializer.new(@grocery).serializable_hash.to_json, status: :created
        else
          render json: { errors: @grocery.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @grocery.update(grocery_params)
          render json: GroceryItemSerializer.new(@grocery).serializable_hash.to_json
        else
          render json: { errors: @grocery.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @grocery.destroy
        head :no_content
      end

      private

      def set_grocery
        @grocery = GroceryItem.find(params[:id])
      end

      def grocery_params
        params.require(:grocery_item).permit(:name, :user_id)
      end
    end
  end
end
