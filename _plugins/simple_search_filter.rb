module Jekyll
  module CharFilter
    def remove_chars(input)
      input.gsub! '\\','&#92;'
      input.gsub! /\t/, '    '
      input.strip_control_and_extended_characters
    end
  end
end

Liquid::Template.register_filter(Jekyll::CharFilter)

class String
  def strip_control_and_extended_characters()
    chars.each_with_object("") do |char, str|
      str << char if char.ord.between?(32,126) || char.ord.between?(0x4E00,0x9FFF)
    end
  end
end
