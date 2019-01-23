module.exports = app => {
    const {existsOrError, notExistisOrError, newsLetterFilter}  = app.api.validation;
    const limit = 10;

    const save = async (req, res) => {
        const subscribe = newsLetterFilter(req);

        if(req.params.id) subscribe.id = req.params.id;

        try {
            existsOrError(subscribe.email, 'E-mail não informado!');

            const subscribeFromDB = await app.db('newsletter')
                .where({ email: subscribe.email }).first();
            if(!subscribe.id) notExistisOrError(subscribeFromDB, 'Já é inscrito.')

        } catch (msg) {
            res.status(400).send(msg);
        }

        if (subscribe.id) {
            app.db('newsletter').update(subscribe)
                .where({ id: subscribe.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            subscribe.createdAt = new Date();

            app.db('newsLetter').insert(subscribe)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const get = async (req, res) => {
        const page = req.query.page || 1;
        const result = await app.db('newsletter').count({ count: 'id' }).first();
        const count = parseInt(result.count);

        app.db('newsletter')
            .limit(limit).offset(page * limit - limit)
            .then(subscribes => res.json({ data: subscribes, count, limit }))
            .catch(err => res.status(500).send(err))
    };

    const getById = (req, res) => {
        app.db('newsletter')
            .where({ id: req.params.id })
            .then(subscribe => res.json(subscribe))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res) => {
        try {

            const rowsDeleted = await app.db('newsletter')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Inscrição não encontrada!');

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    };

    const sendNews  = async (req, res) => {
        const subscribes = await app.db('newsletter')
            .select('email').where({ active: true });
        const subject = req.body.subject;
        const text = req.body.content;

        subscribes.map(subscribe => {
            const mailOpitions = {
                from: 'no-replay@contact.com',
                to: subscribe.email,
                subject,
                text
            };

            app.mailer.sendMail(mailOpitions, (err, info) => {
                if (err) res.status(500).send(err);

                res.status(204).send(info)
            })
        })
    };

    return { save, get, getById, remove, sendNews }
};