# == Schema Information
#
# Table name: books
#
#  id         :integer          not null, primary key
#  title      :string
#  author     :string
#  age        :integer
#  format     :integer          default("bard")
#  config     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Book < ApplicationRecord
  has_many :fragments

  enum :format => { :bard => 0, :epub => 1 }
  formats = { :bard => 0, :epub => 1 }

end
