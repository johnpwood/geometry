require 'json'
Dir.glob("*/*") do |f|
  next if f.match(".json")
  next if File.exist?("#{f}.json") and File.mtime("#{f}.json").to_i > File.mtime(f).to_i
  puts "parsing #{f}"
  o = Hash.new
  a = IO.readlines(f)
  puts a[0]
  puts a[1]
  puts a[2]
  puts a[3]
  o["statement"] = a[0]
  o["conclusion"] = a[1]
  o["steps"] = []
  o["elements"] = []
  i = 2
  puts "getting steps"
  while(a[i].chomp! != "elements:")
    o["steps"].push(Hash("text" => a[i], "reveal" => a[i+1].split(" ")))
    i += 2
  end
  puts "got steps"
  i+=1
  while(a[i])
    x = a[i].split(" ")
    name = x.shift
    t = x.shift
    case t
    when "P"
      type = "point"
    when "L"
      type = "line"
    when "S"
      type = "segment"
    when "C"
      type = "circle"
    when "R"
      type = "line"
      props = Hash("straightLast" => true, "straightFirst" => false)
    when "G"
      type = "glider"
    when "I"
      type = "intersection"
    else
      puts "hoping for element type, received: #{t}"
    end
    if(t == "R")
      o["elements"].push(Hash("props" => props, "name" => name, "type" => type, "parents" => x))
    else
      o["elements"].push(Hash("name" => name, "type" => type, "parents" => x))
    end
    i +=1
  end
  output = File.new("#{f}.json", "w")
  output.write(o.to_json)
  output.close
end
