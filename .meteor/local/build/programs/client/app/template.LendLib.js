(function(){Meteor.startup(function(){document.body.appendChild(Spark.render(Template.__define__(null,Package.handlebars.Handlebars.json_ast_to_func(["<div id=\"lendlib\">\n\t\t<div id=\"categories-container\">\n  \t\t\t",[">","categories"],"\n  \t\t</div>\n  \t\t<div id=\"list\">\n  \t\t\t",[">","list"],"\n  \t\t</div>\n\t</div>"]))));});Template.__define__("categories",Package.handlebars.Handlebars.json_ast_to_func(["<h2 class=\"title\">my stuff</h2>\n\t<div id=\"categories\" class=\"btn-group\">\n\t\t",["#",[[0,"if"],[0,"new_cat"]],["\n\t\t\t<div class=\"category\">\n\t\t\t\t<input type=\"text\" id=\"add-category\" value=\"\"/>\n\t\t\t</div>\n\t\t"],["\n\t\t\t<div class=\"category btn btn-inverse\" id=\"btnNewCat\">&plus;</div>\n\t\t"]],"\n\t\t",["#",[[0,"each"],[0,"lists"]],["\n\t\t\t<div class=\"category btn ",["{",[[0,"list_status"]]],"\" id=\"",["{",[[0,"_id"]]],"\">\n\t\t\t\t",["{",[[0,"Category"]]],"\n\t\t\t</div>\n\t\t"]],"\n\t</div>"]));
Template.__define__("list",Package.handlebars.Handlebars.json_ast_to_func(["<ul id=\"lending_list\">\n\t\t",["#",[[0,"each"],[0,"items"]],["\n\t\t<li class=\"lending_item alert\">\n\t\t\t<button type=\"button\" class=\"close delete_item\" id=\"",["{",[[0,"Name"]]],"\">x</button>\n\t\t\t",["{",[[0,"Name"]]],"\n\t\t\t",["#",[[0,"if"],[0,"lendee_editing"]],["\n\t\t\t\t<input type=\"text\" id=\"edit_lendee\" class=\"span2 pull-right\" value=\"",["{",[[0,"LentTo"]]],"\"/>\n\t\t\t"],["\n\t\t\t\t<div class=\"lendee pull-right label ",["{",[[0,"LendClass"]]],"\">",["{",[[0,"Lendee"]]],"</div>\n\t\t\t"]],"\n\t\t</li>\n\t\t"]],"\n\t\t",["#",[[0,"if"],[0,"list_selected"]],["\n\t\t\t<li class=\"alert-success\" id=\"btnAddItem\">&plus;\n\t\t\t\t",["#",[[0,"if"],[0,"list_adding"]],["\n\t\t\t\t\t<input type=\"text\" class=\"span4\" id=\"item_to_add\" size=\"32\"/>\n\t\t\t\t"]],"\n\t\t\t</li>\n\t\t"]],"\n\t</ul>"]));

})();