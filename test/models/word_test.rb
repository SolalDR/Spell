# == Schema Information
#
# Table name: words
#
#  id                     :integer          not null, primary key
#  name                   :string
#  match                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  config                 :jsonb            not null
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  figure_file_name       :string
#  figure_content_type    :string
#  figure_file_size       :integer
#  figure_updated_at      :datetime
#  book_id                :integer
#

require 'test_helper'

class WordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
