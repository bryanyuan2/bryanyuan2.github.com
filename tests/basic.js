module.exports = {

    before: function(browser) {
        console.log("Setting up ...");
    },

    after : function(browser) {
        browser.end()
        console.log("Closing down ...");
    },

    'all sections area are existed' : function (browser) {
        browser
            .url('http://localhost:3000/')
            .assert.visible('#regionHeader')
            .assert.visible('#regionContacts')
            .assert.visible('#regionEducation')
            .assert.visible('#regionSkills')
            .assert.visible('#regionExperence')
            .assert.visible('#regionAwards')
            .assert.visible('#regionProjects')
            .assert.visible('#regionCommunities')
            .assert.visible('#regionPublications')
            .assert.visible('#regionFooter');
        ;
    },
    'all sections title are existed' : function (browser) {
        browser
            .url('http://localhost:3000/')
            .assert.visible('#setEducation')
            .assert.visible('#setSkills')
            .assert.visible('#setExperence')
            .assert.visible('#setAwards')
            .assert.visible('#setProjects')
            .assert.visible('#setCommunities')
            .assert.visible('#setPublications');
        ;
    }
};