module.exports = app => {
    const { existsOrError, notExistisOrError, categoryFilter } = app.api.validation;
    const limit = 10; //Pagination

    const save = (req, res) => {
        const category  = categoryFilter(req);

        if (req.params.id) category.id = req.params.id;
        if(!category.status) category.status = true;

        try {
            existsOrError(category.name, 'Nome da categoria não informado');
            if (!category.id) existsOrError(category.userId, 'Usuário não informado');
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            category.createdAt = new  Date();

            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };


    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId);
            return parent.length ? parent[0] : null;
        };

        const categoriesWithPath = categories.map(category => {
            let path = category.name;
            let parent = getParent(categories, category.parentId);

            while (parent) {
                path = `${parent.name} > ${path}`;
                parent = getParent(categories, parent.parentId);
            }

            return { ...category, path};
        });

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1;
            if (a.path > b.path) return 1;
            return 0
        });

        return categoriesWithPath;
    };

    const get = async (req, res) => {
        const page = req.query.page || 1;
        const result = await app.db('categories').count('id').first();
        const count = parseInt(result.count);

        app.db('categories')
            .limit(limit).offset(page * limit - limit)
            .then(categories => res.json({ data: withPath(categories), count, limit }))
            .catch(err => res.status(500).send(err))
    };

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    };

    const toTree = (categories, tree ) => {
        if(!tree) tree = categories.filter(c => !c.parentId);

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId === parentNode.id;
            parentNode.children = toTree(categories, categories.filter(isChild));
            return parentNode
        });

        return tree
    };

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res ) => {
        try {
            existsOrError(req.params.id, 'Categoria não informada!');

            const subcategory = await app.db('categories').where({ parentId: req.params.id });
            notExistisOrError(subcategory, 'A categoria possui subcategorias!');

            const articles = await app.db('articles').where({ categoryId: req.params.id });
            notExistisOrError(articles, 'A categoria possui artigos!');

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Categoria não encontrada!');

            return res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg);
        }
    };

    return { save, get, getById, getTree, remove }
};