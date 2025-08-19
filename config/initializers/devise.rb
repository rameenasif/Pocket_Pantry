# frozen_string_literal: true

Devise.setup do |config|
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'
  require 'devise/orm/active_record'

  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]

  
  config.skip_session_storage = [:http_auth]
  config.navigational_formats = []

  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.fetch(:secret_key_base)

    jwt.dispatch_requests = [
      ['POST', %r{^/users/sign_in$}],
      ['POST', %r{^/users$}],
      ['POST', %r{^/login$}]
    ]

    jwt.revocation_requests = [
      ['DELETE', %r{^/users/sign_out$}],
      ['DELETE', %r{^/logout$}]
    ]

    # Remove request format restriction so any request (incl. multipart) is authenticated
    # jwt.request_formats = { user: [:json] }

    jwt.expiration_time = 1.hour.to_i
  end

  config.sign_out_via = :delete
end


