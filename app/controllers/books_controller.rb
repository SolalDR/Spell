class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy, :tree]
  before_action :is_admin?, only: [:new, :edit, :create, :update, :destroy]
  before_action :authenticate_user!

  # GET /books
  # GET /books.json
  def index
    @books = Book.all
  end

  # GET /books/1
  # GET /books/1.json
  def show
    respond_to do |format|
      format.js
      format.json
      format.html
    end
  end

  def tree
    if !@book_mark 
      redirect_to @book, notice: "Vous ne disposez pas de ce livre"
    end
    @fragments = Fragment.where(book: params[:id])
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)
    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
      @book_mark = BookMark.find_by({book: @book.id, user: current_user});
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:title, :author, :age, :publisher, :description, :config, :ressources_attributes => [:id, :name, :_destroy, :mode, :file])
    end

    def is_admin?
      if !current_user || !current_user.admin?
        redirect_to root_path, notice: "Vous n'êtes pas autoriser à modifier ces ressources"
      end
    end
end
