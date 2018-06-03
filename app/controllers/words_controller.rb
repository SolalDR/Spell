class WordsController < ApplicationController
  before_action :set_book, only: :index
  before_action :authenticate_user!

  def index
    @words = Word.where(book: @book)
    respond_to do |format|
      format.json  { render :json => @words } # don't do msg.to_json
    end
  end

  private 
    def set_book
      if params[:book_id]
        @book = Book.find(params[:book_id])
        if !@book 
          redirect_to root_path, notice: "Le livre cherché n'existe pas."
        end
      end
    end
end 
