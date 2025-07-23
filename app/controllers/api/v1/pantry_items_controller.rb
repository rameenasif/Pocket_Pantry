module Api
  module V1
    class PantryItemsController < ApplicationController
      before_action :set_pantry_item, only: [ :show, :update, :destroy ]

      def index
        @pantry_items = PantryItem.page(params[:page]).per(5)
        render json: PantryItemSerializer.new(@pantry_items, {
          meta: {
            current_page: @pantry_items.current_page,
            next_page: @pantry_items.next_page,
            prev_page: @pantry_items.prev_page,
            total_pages: @pantry_items.total_pages,
            total_count: @pantry_items.total_count
          }
        }).serializable_hash.to_json
      end

      def show
        render json: PantryItemSerializer.new(@pantry_item).serializable_hash.to_json
      end

      def create
        @pantry_item = PantryItem.new(pantry_item_params)
        if @pantry_item.save
          render json: PantryItemSerializer.new(@pantry_item).serializable_hash.to_json, status: :created
        else
          render json: { errors: @pantry_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @pantry_item.update(pantry_item_params)
          render json: PantryItemSerializer.new(@pantry_item).serializable_hash.to_json, status: :ok
        else
          render json: { errors: @pantry_item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @pantry_item.destroy
        head :no_content
      end

      private

      def set_pantry_item
        @pantry_item = PantryItem.find(params[:id])
      end

      def pantry_item_params
        params.require(:pantry_item).permit(:name, :quantity, :user_id)
      end
    end
  end
end
