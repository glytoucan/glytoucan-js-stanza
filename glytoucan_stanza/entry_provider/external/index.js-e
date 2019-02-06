'use strict';

// Handlebars.registerHelper('externalNothingFound', function (data) {
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
    var categoryExternal = {};
    var list, label, id, url, from, description, partnerurl;
    data.results.bindings.forEach(function (d) {
      categoryExternal[d.entry_label.value] = categoryExternal[d.entry_label.value] || {list: [], label: ''};
      label = d.entry_label ? d.entry_label.value : undefined;
      id = d.external_id ? d.external_id.value : undefined;
      url = d.url ? d.url.value : undefined;
      from = d.from ? d.from.value : undefined;
      description = d.description ? d.description.value : undefined;
      partnerurl = d.partner_url ? d.partner_url.value : undefined;
      categoryExternal[d.entry_label.value].label = categoryExternal[d.entry_label.value].label || label;
      categoryExternal[d.entry_label.value].from = categoryExternal[d.entry_label.value].from || from;
      categoryExternal[d.entry_label.value].description = categoryExternal[d.entry_label.value].description || description;
      categoryExternal[d.entry_label.value].partnerurl= categoryExternal[d.entry_label.value].partnerurl || partnerurl;
      categoryExternal[d.entry_label.value].list.push({id: id, url: url});
    });
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: categoryExternal
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
