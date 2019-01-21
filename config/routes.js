module.exports = app => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);
    app.post('/contact', app.api.contact.save);
    app.post('/subscribe', app.api.newsletter.save);
    app.post('/subscribe/cancel', app.api.newsletter.save);

    app.get('/navbar', app.api.category.getTree);
    app.get('/card/:id/content', app.api.article.getByCategory);
    app.get('/content/:id', app.api.article.getById);

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.get)
        .post(app.api.user.save);

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove);

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save);

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove);

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.get)
        .post(app.api.article.save);

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove);

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory);

    app.route('/socialmedias')
        .all(app.config.passport.authenticate())
        .get(app.api.social.get)
        .post(app.api.social.save);

    app.route('/socialmedias/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.social.getById)
        .put(app.api.social.save)
        .delete(app.api.social.remove);

    app.route('/contacts')
        .all(app.config.passport.authenticate())
        .get(app.api.contact.get);

    app.route('/contacts/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.contact.getById)
        .delete(app.api.contact.remove);

    app.route('/newsletter')
        .all(app.config.passport.authenticate())
        .get(app.api.newsletter.get)
        .post(app.api.newsletter.save);

    app.route('/newsletter/sendnew')
        .all(app.config.passport.authenticate())
        .post(app.api.newsletter.sendNews);

    app.route('/newsletter/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.newsletter.getById)
        .put(app.api.newsletter.save)
        .delete(app.api.newsletter.remove);
};