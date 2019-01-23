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

    const articleFilter = req => {
        return {
            id: req.body.id,
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            coverImg: req.body.coverImg,
            cardImg: req.body.cardImg,
            content: req.body.content,
            categoryId: req.body.categoryId,
            userId: req.body.userId
        }
    };

    const socialFilter = req => {
        return {
            id: req.body.id,
            network: req.body.network,
            url: req.body.url,
            visible: req.body.visible,
            userUpdatedId: req.body.userUpdatedId,
            userId: req.body.userId
        }
    };

    const contactFilter = req => {
        return {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            phone: req.body.phone,
            content: req.body.content
        }
    };

    const newsLetterFilter = req => {
        return {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            active: req.body.active
        }
    };

    const signinFilter = req => {
        return {
            email: req.body.email,
            password: req.body.password
        }
    };

    const answerFilter = req => {
        return {
            id: req.body.id,
            subject: req.body.subject,
            content: req.body.content,
            userId: req.body.userId,
            contactId: req.body.contactId
        }
    };

    return {
        existsOrError,
        notExistisOrError,
        equalsOrError,
        categoryFilter,
        userFilter,
        articleFilter,
        socialFilter,
        contactFilter,
        newsLetterFilter,
        signinFilter,
        answerFilter
    }
};