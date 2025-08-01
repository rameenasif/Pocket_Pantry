class Rack::Attack
  safelist("allow localhost") do |req|
    req.ip=="127.0.0.1"
  end

  throttle("limit per IP", limit: 5, period: 1.second) do |req|
    req.ip
  end
end
