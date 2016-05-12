'use strict';

Handlebars.registerHelper('nothingFound', function (data) {
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
    var list = data.results.bindings.map(function (d) {
      d.notation = params.notation;
      return d;
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: list
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
