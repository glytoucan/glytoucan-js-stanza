'use strict';

Handlebars.registerHelper('iupacCondensedNothingFound', function (data) {
  return data.length === 0 ? '<p class="stanzaNothingFound">Nothing found in this entry.</p>' : '';
});

Stanza(function (stanza, params) {
  // switch endpoint
  var hostname = window.location.hostname ;
  console.log('host: %s', hostname);
  if (hostname == 'glytoucan.org' || hostname == 'pre.glytoucan.org') {
    var sEndpoint = "https://ts.glytoucan.org/sparql";
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
