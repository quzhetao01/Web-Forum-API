class CommentsController < ApplicationController

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/:post_id
  def show
    @comments = Comment.where(post_id: params[:post_id])
    render json: @comments, methods: [:user]
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, methods: [:user], status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/:comment_id
  def update
    @comment = Comment.find(params[:comment_id])
    if @comment.update(comment_params)
      @comments = Comment.where(post_id: @comment.post_id)
      render json: @comments, methods: [:user]
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/:comment_id
  def destroy
    @comment = Comment.find(params[:comment_id])
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    # Only allow a list of trusted parameters Cthrough.
    def comment_params
      params.require(:comment).permit(:text, :post_id, :user_id)
    end

    def user
      User.find(self.user_id)
    end
end
