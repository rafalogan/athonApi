module.exports = app => {
    const { existsOrError, answerFilter } = app.api.validation;
    const limit = 10;

    const sendAnswer = async (req, res) => {
        const data = { ...req.body };
        const to = await app.db('contact').select('email')
            .where({ id : data.contactId });
        const subject = `RE: ${data.subject}`;
        const text = `Resposta ao contato: ${ data.subject } 

                      ${data.content}`;

        const mailOptions = {
            from: 'no-replay@contact.com',
            to,
            subject,
            text
        };

        try {
          app.mailer.sendMail(mailOptions, (err, info) => {
              if (err) return err;
              return res.status(204).send(info)
          })
        } catch (err) {
            return res.status(503).send(err)
        }
    };

    const save = (req, res) => {
        const answer = answerFilter(req);

        if (req.params.id) answer.id = req.params.id;

        try {
            existsOrError(answer.subject, 'Assunto não informado!');
            existsOrError(answer.content, 'Rsposta não informada!');
            existsOrError(answer.userId, 'Usuárui não informado!');
            existsOrError(answer.contactId, 'Duvida não informada!');
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (answer.id) {
            app.db('answer')
                .update(answer)
                .where({ id: answer.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            answer.createdAt = new Date();

            app.db('answer')
                .insert(answer)
                .then(_ => res.status(201).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const get = async (req, res) => {
        const page = req.query.page || 1;
        const result = await app.db('answer').count({ count: 'id' }).first();
        const count = parseInt(result.count);

        app.db('answer')
            .limit(limit).offset(page * limit - limit)
            .then(answers => res.json({ data: answers, count, limit }))
            .catch(err => res.status(500).send(err))
    };

    const getById = async (req, res) => {
        const validId = await app.db('answer').count({ count: 'id' })
            .where({ id: req.params.id }).first();

         if (!validId.count) return res.status(404).send();

        app.db('answer')
            .where({ id: id })
            .then(answer => res.json(answer))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Resposta não informada');

            const rowsDeleted = await app.db('answer')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Resposta não encontrada!');

            return res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    };

    return { save, get, getById, remove, sendAnswer }
};