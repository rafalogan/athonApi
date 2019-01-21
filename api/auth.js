const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError, notExistisOrError, signinFilter } = app.api.validation;

    const signin = async (req, res) => {
        const entry = signinFilter(req);

        const user = await app.db('users')
            .where({ email: entry.email }).first();

        try {
            existsOrError(entry.email, 'Usuário não informado, informe o email de login.');
            existsOrError(entry.password, 'Senha não informada, informe a senha de acesso.');
            existsOrError(user, 'Usuário não encontado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        const isMatch = bcrypt.compareSync(entry.password, user.password);
        if (!isMatch) return res.status(401).send('Login não autorizado!! Verifique seu e-mail e senha.');

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            exp: now + (60 * 60 * 24)
        };

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    };

    const validateToken = async (req, res ) => {
        const userData = req.body || null;
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret);
                if (new Date(token.exp * 1000) > new Date()) return res.send(true);
            }
        } catch (e) {
            // problema com o token
        }

        res.send(false)
    };

    return { signin, validateToken }
};