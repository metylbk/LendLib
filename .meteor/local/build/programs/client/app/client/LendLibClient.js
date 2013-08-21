(function(){//if (Meteor.isClient) {
  Meteor.subscribe("Categories");
  Meteor.autosubscribe(function() {
    Meteor.subscribe("ListDetails", Session.get('current_list'));
  });

  var selectCategory = function(e, t) {
    Session.set('current_list', this._id);
  };

  var focusText = function(i) {
    i.focus();
    i.select();
  };
  // Template.hello.greeting = function () {
  //   return "My list.";
  // };

  Template.categories.lists = function() {
    return lists.find({}, {sort: {Category: 1}});
  };
  Session.set('adding_category', false);
  Template.categories.new_cat = function() {
    return Session.equals('adding_category', true);
  };
  Template.categories.events({
    'click #btnNewCat': function(e, t) {
      Session.set('adding_category', true);
      Meteor.flush();
      focusText(t.find("#add-category"));
    },
    'keyup #add-category': function(e, t) {
      if (e.which === 13) {
        var catVal = String(e.target.value || "");
        if (catVal) {
          lists.insert({Category: catVal});
          Session.set('adding_category', false);
        }
      }
    },
    'focusout #add-category': function(e, t) {
      Session.set('adding_category', false);
    },
    'click .category': selectCategory
  });

  var addItem = function(list_id, item_name) {
    if (!list_id || !item_name) return;
    lists.update({_id: list_id}, {$addToSet: {items: {Name: item_name, Owner: "me"}}});
  };

  var updateLendee = function(list_id, item_name, lendee) {
    if (!list_id || !item_name) return;
    var cat = lists.findOne({_id: list_id});
    if (!cat || !cat.items) return;
    for (var i = 0; i < cat.items.length; i++) {
      if (cat.items[i].Name === item_name) {
        cat.items[i].LentTo = lendee;
        break;
      }
    }
    lists.update({_id: list_id}, {$set: {items: cat.items}});
  };

  var removeItem = function(list_id, item_name) {
    if (!list_id || !item_name) return;
    lists.update({_id: list_id}, {$pull: {items: {Name: item_name}}});
  };

  Template.list.items = function() {
    if (Session.equals('current_list', null))
      return null;
    else {
      var cats = lists.findOne({_id:Session.get('current_list')});
      if (cats && cats.items) {
        for (var i = 0; i < cats.items.length; i++) {
          var d = cats.items[i];
          d.Lendee = d.LentTo ? d.LentTo : "free";
          d.LendClass = d.LentTo ? "label-important" : "label-success";
        }
        return cats.items;
      }
    }
  };
  Template.list.list_selected = function() {
    return ((Session.get('current_list')!==null) && (!Session.equals('current_list', null)));
  };
  Template.categories.list_status = function() {
    if (Session.equals('current_list', this._id))
      return "";
    else
      return " btn-inverse";
  };
  Template.list.list_adding = function() {
    return (Session.equals('list_adding', true));
  };
  Template.list.lendee_editing = function() {
    return (Session.equals('lendee_input', this.Name));
  };
  Template.list.events({
    'click #btnAddItem': function(e, t) {
      Session.set('list_adding', true);
      Meteor.flush();
      focusText(t.find("#item_to_add"));
    },
    'keyup #item_to_add': function(e, t) {
      if (e.which === 13) {
        addItem(Session.get('current_list'), e.target.value);
        Session.set('list_adding', false);
      }
    },
    'focusout #item_to_add': function(e, t) {
      Session.set('list_adding', false);
    },
    'click .delete_item': function(e, t) {
      removeItem(Session.get('current_list'), e.target.id);
    },
    'click .lendee': function(e, t) {
      Session.set('lendee_input', this.Name);
      Meteor.flush();
      focusText(t.find("#edit_lendee"));
    },
    'keyup #edit_lendee': function(e, t) {
      if (e.which === 13) {
        updateLendee(Session.get('current_list'), this.Name, e.target.value);
        Session.set('lendee_input', null);
      }
      if (e.which === 27) {
        Session.set('lendee_input', null);
      }
    },
    'focusout #edit_lendee': function(e, t) {
      Session.set('lendee_input', null);
    }
  });
//}

})();
