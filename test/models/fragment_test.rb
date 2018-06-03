# == Schema Information
#
# Table name: fragments
#
#  id                     :integer          not null, primary key
#  name                   :string
#  content                :text
#  config                 :jsonb            not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  book_id                :integer
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#

require 'test_helper'

class FragmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
