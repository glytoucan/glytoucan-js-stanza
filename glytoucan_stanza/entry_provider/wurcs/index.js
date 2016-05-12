'use strict';

Handlebars.registerHelper('wurcsNothingFound', function (data) {
  return data.length === 0 ? '<p class="stanzaNothingFound">Can\'t get wurcs data.</p>' : '';
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
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: data.results.bindings
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
