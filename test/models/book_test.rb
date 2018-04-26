# == Schema Information
#
# Table name: books
#
#  id          :integer          not null, primary key
#  title       :string
#  author      :string
#  age         :integer
#  format      :integer          default("bard")
#  config      :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#  publisher   :text
#

require 'test_helper'

class BookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
