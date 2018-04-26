# == Schema Information
#
# Table name: fragments
#
#  id         :integer          not null, primary key
#  name       :string
#  content    :text
#  config     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :integer
#

require 'test_helper'

class FragmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
