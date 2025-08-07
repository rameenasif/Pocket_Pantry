ActiveSupport::Notifications.subscribe("sql.active_record") do |name, start, finish, id, payload|
  duration = (finish - start) * 1000.0 

  if duration > 500 && payload[:name] != "SCHEMA"
    Rails.logger.warn "SLOW QUERY (#{duration.round}ms): #{payload[:sql]}"
  end
end
