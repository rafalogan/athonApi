module.exports = app => {
    const { existsOrError, socialFilter } = app.api.validation;

    const save = (req, res) => {
        const social = socialFilter(req);

        if (req.params.id) social.id = req.params.id;

        try {
            existsOrError(social.network, 'Rede Social não informada!');
            existsOrError(social.url, 'A url não informada!');
            if (social.id) existsOrError(social.userUpdatedId, 'Usuário de alteração não informado!');
            if (!social.id) existsOrError(social.userId, 'Usuário não informado!')
        }catch (msg) {
            return res.status(400).send(msg)
        }

        if (social.id) {
            social.updatedAt = new Date();

            app.db('socialmedia').update(social)
                .where({ id : social.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            social.createdAt = new Date();
            if (!social.visible) social.visible = true;

            app.db('socialmedia').insert(social)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const get = (req, res) => {
        app.db('socialmedia')
            .select('id', 'network', 'visible')
            .then(socialmedias => res.json(socialmedias))
            .catch(err => res.status(500).send(err))
    };

    const getById = async (req, res) => {
        const validId = await app.db('socialmedia').count({ count: 'id' })
            .where({ id: req.params.id }).first();

        if(!validId.count) return res.status(404).send();

        app.db('socialmedia')
            .where({ id: id }).first()
            .then(socialMedia => res.json(socialMedia))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Rede social não informada!');

            const rowsDeleted = await app.db('socialmedia')
                .where({ id: req.params.id }).del();

            existsOrError(rowsDeleted, 'Rede social não encontrada!');

            return res.status(204).send();
        } catch (msg) {
            return res.status(400).send(msg)
        }
    };

    return { save, get, getById, remove }
};