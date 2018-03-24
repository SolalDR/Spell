class BookMarksController < ApplicationController
  before_action :set_book_mark, only: [:show, :edit, :update, :destroy]

  # GET /book_marks
  # GET /book_marks.json
  def index
    @book_marks = BookMark.all
  end

  # GET /book_marks/1
  # GET /book_marks/1.json
  def show
  end

  # GET /book_marks/new
  def new
    @book_mark = BookMark.new
  end

  # GET /book_marks/1/edit
  def edit
  end

  # POST /book_marks
  # POST /book_marks.json
  def create
    @book_mark = BookMark.new(book_mark_params)

    respond_to do |format|
      if @book_mark.save
        format.html { redirect_to @book_mark, notice: 'Book mark was successfully created.' }
        format.json { render :show, status: :created, location: @book_mark }
      else
        format.html { render :new }
        format.json { render json: @book_mark.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /book_marks/1
  # PATCH/PUT /book_marks/1.json
  def update
    respond_to do |format|
      if @book_mark.update(book_mark_params)
        format.html { redirect_to @book_mark, notice: 'Book mark was successfully updated.' }
        format.json { render :show, status: :ok, location: @book_mark }
      else
        format.html { render :edit }
        format.json { render json: @book_mark.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /book_marks/1
  # DELETE /book_marks/1.json
  def destroy
    @book_mark.destroy
    respond_to do |format|
      format.html { redirect_to book_marks_url, notice: 'Book mark was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book_mark
      @book_mark = BookMark.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_mark_params
      params.require(:book_mark).permit(:user_id, :book_id, :config, :nb_visit)
    end
end
