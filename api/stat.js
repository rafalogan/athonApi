module.exports = app => {

    const defaultStat = app.statsDb.get('stats')
        .find({ id : 1 }).value();

    const get = (req, res) => {
        const stat = app.statsDb.get('stats').find({ id: 2 })
            .value();
        res.json( stat || defaultStat )
    };

    return { get }
};