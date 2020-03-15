module.exports = {
    isOwner:function(request, response) {
      if (request.session.passport) {
        if (request.session.passport.user) {
            return true;
        }
      }
      return false;

    },
    statusUI:function(request, response) {
        var authStatusUI = '<a href="/auth/login">login</a> '
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.session.passport.user.displayName} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}
