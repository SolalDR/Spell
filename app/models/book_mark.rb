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

class BookMark < ApplicationRecord
  belongs_to :user
  belongs_to :book
end
