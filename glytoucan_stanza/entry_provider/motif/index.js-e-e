'use strict';

Handlebars.registerHelper('motifNothingFound', function (data) {
  return data.length === 0 ? '<li class="stanzaNothingFound">Nothing found in this entry.</li>' : '';
});

Stanza(function (stanza, params) {
  // switch endpoint
  var hostname = window.location.hostname ;
  console.log('host: %s', hostname);
  if (hostname == 'gtc.glycosmos.org' || hostname == 'pre.glytoucan.org') {
    var sEndpoint = "https://static.ts.glycosmos.org/sparql";
  } else {
    var sEndpoint = "https://test.ts.glycosmos.org/sparql";
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
