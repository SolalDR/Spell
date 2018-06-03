# == Schema Information
#
# Table name: books
#
#  id                     :integer          not null, primary key
#  title                  :string
#  author                 :string
#  age                    :integer
#  format                 :integer          default("bard")
#  config                 :jsonb            not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  description            :text
#  publisher              :text
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  cover_file_name        :string
#  cover_content_type     :string
#  cover_file_size        :integer
#  cover_updated_at       :datetime
#

require 'test_helper'

class BookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
