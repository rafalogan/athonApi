module.exports = app => {
    function existsOrError(value, msg) {
        if (!value) throw msg;
        if (Array.isArray(value) && value.length === 0) throw msg;
        if (typeof value === 'string' && !value.trim()) throw msg;
    }

    function notExistisOrError(value, msg) {
        try {
            existsOrError(value, msg);
        } catch (msg) {
            return
        }

        throw msg;
    }

    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    const userFilter = req => {
        const user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin
        };

        if (req.body.confirmPassword) user.confirmPassword = req.body.confirmPassword;

        return user
    };

    const categoryFilter = req => {
        return {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            status: req.body.status,
            parentId: req.body.parentId,
            userId: req.body.userId
        }
    };

    return { existsOrError, notExistisOrError, equalsOrError, categoryFilter, userFilter }
};