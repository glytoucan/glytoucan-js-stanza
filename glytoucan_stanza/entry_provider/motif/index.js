'use strict';

Handlebars.registerHelper('nothingFound', function (data) {
  return data.length === 0 ? '<li class="stanzaNothingFound">Nothing found.</li>' : '';
});

Stanza(function (stanza, params) {
  // switch endpoint
  var hostname = window.location.hostname ;
  console.log('host: %s', hostname);
  if (hostname == 'glytoucan.org' || hostname == 'pre.glytoucan.org') {
    var sEndpoint = "https://ts.glytoucan.org/sparql";
  } else {
    var sEndpoint = "http://test.ts.glytoucan.org/sparql";
  }
  console.log('endpoint: %s', sEndpoint);

  var q = stanza.query({
    endpoint: sEndpoint,
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
