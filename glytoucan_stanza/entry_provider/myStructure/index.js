'use strict';

Handlebars.registerHelper('myStructureNothingFound', function (data) {
  return data.length === 0 ? '<p class="stanzaNothingFound">No data found.</p>' : '';
});

Stanza(function (stanza, params) {
  var q = stanza.query({
    endpoint: "http://test.ts.glytoucan.org/sparql",
    template: "stanza.rq",
    parameters:{
    	userId: params.userId,
    	offset: params.offset
    }
  });
  q.done(function (data) {
    var list = data.results.bindings.map(function (d) {
      d.MassLabel.value = Math.round(10000 * parseFloat(d.MassLabel.value, 10)) / 10000;
      d.CreateDate.value = new Date(d.CreateDate.value).toUTCString();
      d.notation = params.notation;
      return d;
    });
    // var list2 = data.results.bindings.map(function (e) {
    //   return e;
    // });
    var list2[0].offset = params.offset;

    stanza.render({
      template: "stanza.html",
      parameters: {
        data: list,
        offset: list2[0].offset
      },
    });
  });
  q.fail(function (jqXHR) {
    console.log(jqXHR);
  });
});
