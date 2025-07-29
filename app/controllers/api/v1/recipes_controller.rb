module Api
  module V1
    class RecipesController < ApplicationController
      before_action :set_recipe, only: [ :show, :update, :destroy ]
      load_and_authorize_resource

      def index
        @recipes = Recipe.page(params[:page]).per(5)
        render json: RecipeSerializer.new(@recipes, {
          meta: {
            current_page: @recipes.current_page,
            next_page: @recipes.next_page,
            prev_page: @recipes.prev_page,
            total_pages: @recipes.total_pages,
            total_count: @recipes.total_count
          }
        }).serializable_hash.to_json
      end

      def show
        render json: RecipeSerializer.new(@recipe).serializable_hash.to_json
      end

      def create
        @recipe = Recipe.new(recipe_params)
        @recipe.user = current_user
        @recipe.tenant_id=Current.tenant_id

        if @recipe.save
          render json: RecipeSerializer.new(@recipe).serializable_hash.to_json, status: :created
        else
          render json: { errors: @recipe.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @recipe.update(recipe_params)
          render json: RecipeSerializer.new(@recipe).serializable_hash.to_json, status: :ok
        else
          render json: { errors: @recipe.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @recipe.destroy
          render json: { message: "Recipe deleted successfully" }, status: :ok
        else
          render json: { errors: @recipe.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_recipe
        @recipe = Recipe.find(params[:id])
      end

      def recipe_params
        params.require(:recipe).permit(:instructions)
      end
    end
  end
end
