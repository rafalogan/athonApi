const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError, notExistisOrError, equalsOrError, userFilter } = app.api.validation;
    const limit = 10; //Pagination

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt)
    };

    const save = async (req, res) =>  {
        const user = userFilter(req);

        if (req.params.id) user.id = req.params.id;

        try {
            existsOrError(user.name, 'Nome Completo precisa ser informado!');
            existsOrError(user.email, 'E-mail não informado!');
            existsOrError(user.password, 'Senha não informada!');
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida!');
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem!');

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first();
            if (!user.id) notExistisOrError(userFromDB, 'Usuário já cadastrado!');
        } catch (msg) {
            res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password);
        delete user.confirmPassword;

        if (user.id) {
            app.db('users').update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users').insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    };

    const get = async (req, res) => {
        const page = req.body.page || 1;
        const result = await app.db('users').count('id').first();
        const count = parseInt(result.count);

        app.db('users')
            .select('id', 'name', 'email', 'admin', 'deletedAt')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err));
    };

    const getById = (req, res) => {
        const id = req.params.id ? req.params.id : '';

        app.db('users')
            .select('id', 'name', 'email', 'admin', 'deletedAt')
            .where({ id: id }).first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    };

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id });

            existsOrError(rowsUpdated, 'Usuário não encontrado!');

            res.status(204).send();
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    return { save, get, getById, remove }
};