# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🌱 Seeding spices..."


20.times do
    Country.create(name: Faker::Address.unique.country)
end

10.times do
    User.create(
        username: Faker::Name.unique.first_name,
        password: Faker::Internet.password,
    )
end


5.times do
    Trip.create(
        user_id: rand(1..5),
        country_id: rand(1..10),
        budget: rand(2000..5000)
    )
end



puts "✅ Done seeding!"