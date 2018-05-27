module BookMarksHelper
  # Rails
  def svg(name)
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
    return File.read(file_path).html_safe if File.exists?(file_path)
    fallback_path = "#{Rails.root}/app/assets/images/png/#{name}.png"
    return image_tag("png/#{name}.png") if File.exists?(fallback_path)
    '(not found)'
  end

end
