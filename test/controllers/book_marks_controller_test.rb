require 'test_helper'

class BookMarksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book_mark = book_marks(:one)
  end

  test "should get index" do
    get book_marks_url
    assert_response :success
  end

  test "should get new" do
    get new_book_mark_url
    assert_response :success
  end

  test "should create book_mark" do
    assert_difference('BookMark.count') do
      post book_marks_url, params: { book_mark: { book_id: @book_mark.book_id, config: @book_mark.config, nb_visit: @book_mark.nb_visit, user_id: @book_mark.user_id } }
    end

    assert_redirected_to book_mark_url(BookMark.last)
  end

  test "should show book_mark" do
    get book_mark_url(@book_mark)
    assert_response :success
  end

  test "should get edit" do
    get edit_book_mark_url(@book_mark)
    assert_response :success
  end

  test "should update book_mark" do
    patch book_mark_url(@book_mark), params: { book_mark: { book_id: @book_mark.book_id, config: @book_mark.config, nb_visit: @book_mark.nb_visit, user_id: @book_mark.user_id } }
    assert_redirected_to book_mark_url(@book_mark)
  end

  test "should destroy book_mark" do
    assert_difference('BookMark.count', -1) do
      delete book_mark_url(@book_mark)
    end

    assert_redirected_to book_marks_url
  end
end
