'use strict';

Handlebars.registerHelper('externalNothingFound', function (data) {
  return data.length === 0 ? '<li class="stanzaNothingFound">Nothing found.</li>' : '';
});

Stanza(function (stanza, params) {
  var q = stanza.query({
    endpoint: "http://test.ts.glytoucan.org/sparql",
    template: "stanza.rq",
    parameters: {
      accessionNumber: params.acc
    }
  });
  q.done(function (data) {
    var categoryExternal = {};
    var list, label, id, url;
    data.results.bindings.forEach(function (d) {
      categoryExternal[d.from.value] = categoryExternal[d.from.value] || {list: [], label: ''};
      label = d.db_label ? d.db_label.value : undefined;
      id = d.external_id ? d.external_id.value : undefined;
      url = d.url ? d.url.value : undefined;
      from = d.from ? d.from.value : undefined;
      categoryExternal[d.from.value].label = categoryExternal[d.from.value].label || label;
      categoryExternal[d.from.value].from = categoryExternal[d.from.value].from || from;
      categoryExternal[d.from.value].list.push({id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryExternal
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
