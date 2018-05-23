class FragmentsController < ApplicationController
  before_action :set_fragment, only: [:show, :edit, :update, :destroy]
  protect_from_forgery except: :show

  # GET /fragments
  # GET /fragments.json
  def index    
    @fragments = params[:book_id] ? Fragment.where(book: params[:book_id]) : Fragment.all
  end

  # GET /fragments/1
  # GET /fragments/1.json
  def show
    @fragments = Fragment.where(book: @fragment.book)
    @book_mark = BookMark.find_by(book: @fragment.book, user: current_user);
    respond_to do |format|
      format.js
      format.json
      format.html { render "bard", layout: "bard" }
    end
  end

  # GET /fragments/new
  def new
    @fragment = Fragment.new
    @book = Book.find(params[:book_id])
    @fragment.book = @book
  end

  # GET /fragments/1/edit
  def edit
  end

  # POST /fragments
  # POST /fragments.json
  def create
    @fragment = Fragment.new(fragment_params)
    @book = Book.find(params[:book_id])
    respond_to do |format|
      if @fragment.save
        format.html { redirect_to book_fragments_path(book_id: @fragment.book, id: @fragment), notice: 'Fragment was successfully created.' }
        format.json { render :show, status: :created, location: @fragment }
      else
        format.html { render :new }
        format.json { render json: @fragment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fragments/1
  # PATCH/PUT /fragments/1.json
  def update
    respond_to do |format|
      if @fragment.update(fragment_params)
        format.html { redirect_to book_fragments_path(book_id: @fragment.book, id: @fragment), notice: 'Fragment was successfully updated.' }
        format.json { render :show, status: :ok, location: @fragment }
      else
        format.html { render :edit }
        format.json { render json: @fragment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fragments/1
  # DELETE /fragments/1.json
  def destroy
    @fragment.destroy
    respond_to do |format|
      format.html { redirect_to fragments_url, notice: 'Fragment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fragment
      @fragment = Fragment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fragment_params
      params.require(:fragment).permit(:name, :content, :config, :book_id)
    end
end
