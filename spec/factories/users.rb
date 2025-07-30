FactoryBot.define do
  factory :user do
    email { "user@example.com" }
    password { "password" }
    association :tenant
  end
end
