module Api
  module V1
    class OrdersController < ApplicationController
      before_action :authenticate_user!

      def index
        orders = current_user.orders.includes(:grocery_items)
        render json: orders.as_json(include: :grocery_items)
      end

      def create
        order = current_user.orders.build(order_params)
        if order.save
          render json: { message: "Order created", order: order }, status: :created
        else
          render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        order = current_user.orders.find(params[:id])
        if order.update(order_params)
          render json: { message: "Order updated", order: order }
        else
          render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        order = current_user.orders.find(params[:id])
        order.destroy
        render json: { message: "Order canceled" }
      end

      private

      def order_params
        params.require(:order).permit(:status, grocery_item_ids: [])
      end
    end
  end
end
