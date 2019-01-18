module.exports = app => {
    app.route('/users')
        .get(app.api.user.get)
        .post(app.api.user.save);

    app.route('/users/:id')
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove);

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save);

    app.route('/categories/tree')
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove);

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save);

    app.route('/articles/:id')
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove);

    app.route('/categories/:id/articles')
        .get(app.api.article.getByCategory);

    app.route('/socialmedias')
        .get(app.api.social.get)
        .post(app.api.social.save);

    app.route('/socialmedias/:id')
        .get(app.api.social.getById)
        .put(app.api.social.save)
        .delete(app.api.social.remove);

};