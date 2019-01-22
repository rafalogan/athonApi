const schedule = require('node-schedule');


module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count({ count: 'id' }).first();
        const categoriesCount = await app.db('categories').count({ count: 'id' }).first();
        const articlesCount = await app.db('articles').count({ count: 'id' }).first();
        const contactsCount = await app.db('contact').count({ count: 'id' }).first();
        const answerCount = await app.db('answer').count({ count: 'id' }).first();
        const socialmediaCount = await app.db('socialmedia').count({ count: 'id' }).first();

        const lastStat = app.statsDb.get('stats').find({ id: 2 })
            .value();

        const stat = {
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            contacts: contactsCount.count,
            answers: answerCount.count,
            socialmedias: socialmediaCount.count,
            createdAt: new Date()
        };

        const changeUsers = !lastStat || stat.users !== lastStat.users;
        const changeCategories = !lastStat || stat.categories !== lastStat.categories;
        const changeArticles = !lastStat || stat.articles !== lastStat.articles;
        const changeContacts = !lastStat || stat.contacts !== lastStat.contacts;
        const changeAnswers = !lastStat || stat.answers !== lastStat.answers;
        const changeSocialmedias = !lastStat || stat.socialmedias !== lastStat.socialmedias;

        if (changeUsers || changeCategories || changeArticles ||
            changeContacts || changeAnswers || changeSocialmedias) {

            app.statsDb.get('stats').find({ id: 2 })
                .assign({ ...stat })
                .write();

            console.log('[Stats] Estatísticas atualizadas!')
        }
    })
};