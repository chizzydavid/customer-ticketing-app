module RoleHandler
  extend ActiveSupport::Concern

  def agent?
    @current_user.role == 'agent'
  end

  def admin?
    @current_user.role == 'admin'
  end

  def owner?(obj)
    @current_user.id == obj.user_id
  end

end
