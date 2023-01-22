class CommentsController < ApplicationController
  # before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/1
  def show
    @comments = Comment.where(post_id: params[:post_id])
    render json: @comments
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    @comment = Comment.find(params[:comment_id])
    if @comment.update(comment_params)
      render json: Comment.where(post_id: @comment.post_id)
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment = Comment.find(params[:comment_id])
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_comment
    #   @comment = Comment.find(params[:id])
    # end

    # Only allow a list of trusted parameters Cthrough.
    def comment_params
      params.require(:comment).permit(:text, :post_id, :user_id)
    end
end
