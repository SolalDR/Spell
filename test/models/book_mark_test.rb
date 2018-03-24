# == Schema Information
#
# Table name: book_marks
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  book_id    :integer
#  config     :text
#  nb_visit   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BookMarkTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
