class CategoriesController < ApplicationController

  # GET /categories
  def index
    categories = Category.all
    render json: categories
  end

  def create
    puts category_params
  end

  def category_params
    params.require(:category).permit(:categories)
  end
end
