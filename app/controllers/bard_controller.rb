class BardController < ApplicationController
  def start 
    @book = Book.find(params[:book_id])
    @bookMark = BookMark.where({user: current_user, book: @book}).first
  end
end
