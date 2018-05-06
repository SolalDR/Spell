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

class Book < ApplicationRecord
  has_many :fragments
  has_many :ressources, as: :ressourceable
  accepts_nested_attributes_for :ressources, :reject_if => :all_blank, :allow_destroy => true

  enum :format => { :bard => 0, :epub => 1 }
  formats = { :bard => 0, :epub => 1 }

end
