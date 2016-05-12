'use strict';

Handlebars.registerHelper('summaryNothingFound', function (data) {
  return data.length === 0 ? '<p class="stanzaNothingFound">No data found.</p>' : '';
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
      d.Mass_label.value = Math.round(10000 * parseFloat(d.Mass_label.value, 10)) / 10000;
      d.CreateDate.value = new Date(d.CreateDate.value).toUTCString();
      return d;
    });
    var now = new Date();
    list[0].date = now.toString().slice(4, 7) + '. ' + now.getDate() + ', ' + now.getFullYear();
    list[0].notation = params.notation;
    stanza.render({
      template: "stanza.html",
      parameters: {
        data: list
      },
    });
    stanza.select('.citation_btn').addEventListener('click', function (e) {
      e.preventDefault();
      stanza.select('.citation_content').classList.toggle('citation_content--show');
      return false;
    });
    stanza.select('.citation_copy').addEventListener('click', function (e) {
      e.preventDefault();
      var $target = $(stanza.select('.citation_text'));
      var range = document.createRange();
      range.selectNode($target[0]);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      return false;
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
