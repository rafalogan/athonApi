const admin = require('./admin');

module.exports = app => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);
    app.post('/contact', app.api.contact.save);
    app.post('/subscribe', app.api.newsletter.save);
    app.post('/subscribe/cancel/:id', app.api.newsletter.save);

    app.get('/navbar', app.api.category.getTree);
    app.get('/card/:id/content', app.api.article.getByCategory);
    app.get('/content/:id', app.api.article.getById);

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.get))
        .post(admin(app.api.user.save));

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.getById))
        .put(admin(app.api.user.save))
        .delete(admin(app.api.user.remove));

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(admin(app.api.category.save));

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove));

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.get)
        .post( admin(app.api.article.save));

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove));

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory);

    app.route('/socialmedias')
        .all(app.config.passport.authenticate())
        .get(app.api.social.get)
        .post(admin(app.api.social.save));

    app.route('/socialmedias/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.social.getById)
        .put(admin(app.api.social.save))
        .delete(admin(app.api.social.remove));

    app.route('/contacts')
        .all(app.config.passport.authenticate())
        .get(app.api.contact.get);

    app.route('/contacts/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.contact.getById)
        .delete(admin(app.api.contact.remove));

    app.route('/newsletter')
        .all(app.config.passport.authenticate())
        .get(app.api.newsletter.get)
        .post(admin(app.api.newsletter.save));

    app.route('/newsletter/sendnew')
        .all(app.config.passport.authenticate())
        .post(app.api.newsletter.sendNews);

    app.route('/newsletter/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.newsletter.getById)
        .put(admin(app.api.newsletter.save))
        .delete(admin(app.api.newsletter.remove));

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get);
};