'use strict';

// Handlebars.registerHelper('literatureNothingFound', function (data) {
//   console.log('data length: %s', data.length);
//   return data.length === undefined ? '<li class="stanzaNothingFound">Nothing found in this entry.</li>' : '';
// });

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
    var categoryPubMed = {};
    var id, url, from, description, partnerurl;
    data.results.bindings.forEach(function (d) {
      categoryPubMed[d.from.value] = categoryPubMed[d.from.value] || [];
      id = d.pubmed_id ? d.pubmed_id.value : undefined;
      url = d.pubmed_url ? d.pubmed_url.value : undefined;
      description = d.description ? d.description.value : undefined;
      partnerurl = d.partner_url ? d.partner_url.value : undefined;
      categoryPubMed[d.from.value].description = categoryPubMed[d.from.value].description || description;
      categoryPubMed[d.from.value].partnerurl= categoryPubMed[d.from.value].partnerurl || partnerurl;
      categoryPubMed[d.from.value].push({id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryPubMed
      },
    });
    Array.prototype.forEach.call(stanza.selectAll('.source_btn'), function (el) {
      el.addEventListener('click', function (e) {
        e.currentTarget.nextElementSibling.classList.toggle('source_content--show');
      });
    }); 
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
