'use strict';

// Handlebars.registerHelper('speciesNothingFound', function (data) {
//   console.log('data length: %s', data);
//   return data === undefined ? '<li class="stanzaNothingFound">Nothing found in this entry.</li>' : '';
// });

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
    var categoryTax = {};
    var name, id, url, from, description, partnerurl;
    data.results.bindings.forEach(function (d) {
      categoryTax[d.from.value] = categoryTax[d.from.value] || [];
      name = d.taxon_name ? d.taxon_name.value : undefined;
      id = d.taxon_id ? d.taxon_id.value : undefined;
      url = d.taxon_url ? d.taxon_url.value : undefined;
      description = d.description ? d.description.value : undefined;
      partnerurl = d.partner_url ? d.partner_url.value : undefined;
      categoryTax[d.from.value].description = categoryTax[d.from.value].description || description;
      categoryTax[d.from.value].partnerurl= categoryTax[d.from.value].partnerurl || partnerurl;
      categoryTax[d.from.value].push({name: name, id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryTax
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
