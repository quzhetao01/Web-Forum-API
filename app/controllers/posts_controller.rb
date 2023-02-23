class PostsController < ApplicationController
  # before_action :authorize
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all 

    render json: @posts, methods: [:user, :category] 
  end

  # GET /posts/1
  def show
    render json: @post, methods: [:user]
  end

  #GET /posts/search/:search
  def showSearch
    posts = Post.where("header LIKE ?", "%" + params[:search] + "%")
    render json: posts, methods: [:user, :category] 
  end

  #GET /posts/category/:id
  def showCategory
    posts = Post.where(category_id: params[:id])
    render json: posts, methods: [:user, :category] 
  end

  #GET "/posts/ownUser/:id"
  def showUserPosts
    posts = Post.where(user_id: params[:id])
    render json: posts, methods: [:user, :category] 
  end

  # POST /posts
  def create
    @post = Post.new(post_params.merge(user: @user))

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params.merge(user: @user))
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.comments.destroy_all
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:header, :description, :category_id)
    end

    def user
      User.find(self.user_id)
    end

    def category
      Category.find(self.category_id)
    end
end
