class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  layout :layout_by_resource

  private

  def layout_by_resource
    if devise_controller?
      "home"
    else
      "application"
    end
  end

  def after_sign_in_path_for(_)
    book_marks_path
  end

  def after_sign_up_path_for(resource)
    book_marks_path
  end
end
