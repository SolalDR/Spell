class BookMarksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book_mark, only: [:show, :edit, :update, :destroy, :update_config, :sandbox]  
  
  # GET /book_marks
  def index
    @book_marks = BookMark.where(user: current_user)
    @books_interest = Book.all.except(@book_marks.map(&:book)).first(3)
  end


  def read
    @book = Book.find(params[:id]);
    if !current_user
      redirect_to @book, notice: 'Vous devez être connecté pour lire une histoire.'
    end

    @book_mark = BookMark.find_by(book_id: @book.id, user_id: current_user.id);
    if !@book_mark
      redirect_to @book, notice: 'Vous ne disposez pas de ce livre pour le moment, veuillez l\'ajouter à votre bibliothèque.'
    end

    if !@book_mark.fragment
      if @book_mark.book.fragment
        @book_mark.fragment = @book_mark.book.fragment
      else 
        @book_mark.fragment = @book_mark.book.fragments.first
      end
    end

    redirect_to @book_mark.fragment
  end

  # GET /book_marks/1/box
  def sandbox
    @words = Word.where(book: @book_mark.book)
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

  def update_config
    if params[:config]
      config = ActiveSupport::JSON.decode(params[:config])

      @book_mark.config["variables"].keys.each do |key|
        @book_mark.config["variables"][key] = config["variables"][key]
      end

      @book_mark.config["character"]["body_parts"].keys.each do |key|
        @book_mark.config["character"]["body_parts"][key] = config["character"]["body_parts"][key]
      end

      @book_mark.save;

      respond_to do |format|
        format.json { render json: config["variables"] }
      end
    end
  end


  def add_from_book
    @book = Book.find(params[:id])
    if @book && current_user
     @book_mark = BookMark.find_by({book: @book, user: current_user}) 
     if !@book_mark
      @book_mark = BookMark.create({book: @book, user: current_user, fragment: @book.fragments.first, config: @book.config})
      if @book.fragment
        @book_mark.fragment = @book.fragment
      end
      @book_mark.save
     end
    end
    redirect_to @book, notice: @book.title.capitalize + ' a bien été rajouté à votre bibliothèque.'
  end 


  # DELETE /book_marks/1
  # DELETE /book_marks/1.json
  def destroy
    @book_mark.destroy
    respond_to do |format|
      format.html { redirect_to book_marks_url, notice: 'Votre livre a bien été supprimé de votre bibliothèque.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book_mark
      @book_mark = BookMark.find(params[:id])
      if !@book_mark
        redirect_to root_path, notice: "Aucune référence n'existe vers ce marque-page"
      end

      if @book_mark.user.id != current_user.id && !current_user.admin?
        redirect_to @book_mark.book, notice: "Vous n'êtes pas autorisé"
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_mark_params
      params.require(:book_mark).permit(:user_id, :book_id, :config, :nb_visit)
    end
end
