class TenantMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)
    user = request.env["warden"].user

    if user
      Current.user = user
      Current.tenant_id = user.tenant_id
    end
    @app.call(env)
  end
end
