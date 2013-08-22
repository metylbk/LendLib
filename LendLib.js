lists = new Meteor.Collection("Lists");
/*checks to see if the current user making the request to update is the admin user*/
function adminUser(userId) {
	var adminUser = Meteor.users.findOne({username: "admin"});
	return (userId && adminUser && userId === adminUser._id);
}
lists.allow({
	insert: function(userId, doc) {
		return (adminUser(userId) || (userId && doc.owner === userId));
	},
	update: function(userId, doc, fields, modifier) {
		return adminUser(userId) || doc.owner === userId;	
	},
	remove: function(userId, doc) {
		return adminUser(userId) || doc.owner === userId;
	},
	fetch: ['owner']
});

lists.deny({
	update: function(userId, doc, fields, modifier) {
		// can't change owners
		return _.contains(fields, 'owner');
	},
	remove: function(userId, doc) {
		// can't remove locked documents
		return doc.locked;
	},
	fetch: ['locked'] // no need to fetch 'owner'
});