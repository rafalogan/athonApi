const { mailer } = require('../.env');

module.exports = app => {
    const to = 'rafael_sk8er_boy@icloud.com';
    const { existsOrError, notExistisOrError, contactFilter } = app.api.validation;
    const limit = 10;

    const save = async (req, res) => {
        const contact = contactFilter(req);
        let sendMail = {};

        try {
            existsOrError(contact.name, 'Informe seu nome.');
            existsOrError(contact.email, 'Informe seu e-mail.');
            existsOrError(contact.subject, 'Informe o assunto do seu contato.');
            existsOrError(contact.content, 'Menssagem não informada!')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        try {
            const mailOptions = {
                from: 'no-replay@contact.com',
                to,
                subject: contact.subject,
                text: ` O usuário ${contact.name} acabou de mandar a seguinte mensagem: 
                
                ${contact.content}
                
                dados do usuraio:
                    Nome: ${contact.name};
                    E-mail: ${contact.email};
                    Telefone: ${contact.phone ? contact.phone : 'NÃO INFORMADO'}`
            };

             await app.mailer.sendMail(mailOptions, (err, info) => {
                 if (err) {
                     return 'Erro de serviço';
                 } else {
                     sendMail.msg = `Contato Realizado com sucesso`;
                     sendMail.res = info;
                 }
            });
        } catch (err) {
            res.status(503).send(err)
        }

        contact.createdAt = new Date();

        app.db('contact')
            .insert(contact)
            .then(_ => res.status(204).send(sendMail.msg))
            .catch(err => res.status(500).send(err))
    };

    const get = async (req, res) => {
        const page = req.query.page || 1;
        const result = await app.db('contact').count({ count: 'id' }).first();
        const count = parseInt(result.count);

        app.db('contact')
            .select('id', 'name', 'subject', 'createdAt')
            .limit(limit).offset(page * limit - limit)
            .then(contacts => res.json({ data: contacts, count, limit }))
            .catch(err => res.status(500).send(err))
    };

    const getById = (req, res) => {
        app.db('contact')
            .where({ id : req.params.id })
            .then(contct => res.json(contct))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Contanto não informado!');

            const answer = await app.db('answer').where({ contactId: req.params.id });
            notExistisOrError(answer, 'O Contato possue resposta(s): apague-a(s) primeiro e tente novemente');

            const rowsDeleted = await app.db('contact')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Contanto não encontrado!');

            return res.status(204).send()
        } catch (msg) {
            return res.status(400).send(msg)
        }
    };

    return { save, get, getById, remove }
};