$.getJSON( "/beaconplus-server/beaconinfo.cgi?querytype=ontologyids&querytext=ncit:", function( data ) {
  $.each(data, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.child_terms).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
  });
}, 'json');

$.getJSON( "/beaconplus-server/beaconinfo.cgi/?querytype=get_datasetids", function( data ) {
  $.each(data, function(index, value) {
    $('#datasetIds').append( $('<option></option>').val(value).html(value) );
  });
}, 'json');

$( "#toggle_intro" ).click(function() {
  $( "#intro" ).toggle( "slow", function() {});
});

$.each( formExamples, function( key, value ) {
  var example = key;
  var exampledata = value;

  $( "#query_example_group" ).append( '<div id="' + example + '" class="btn btn-info" style="float: left; background-color: #dd9966; margin: -7px 5px 0px 0px;">' + exampledata.label + '</div>');

  $('#' + example).click(function(){
    $('#beacon-form').trigger("reset");
    $('#intro-info').html(exampledata.description);
    $('#intro-info').show();
    $('#bioontology').find('option').remove().end().append( $('<option></option>').val("").html("no selection") );
    var ontoquery = "/beaconplus-server/beaconinfo.cgi?querytype=ontologyids&datasetIds=" + exampledata.parameters.datasetIds.examplevalue;
    $.each(exampledata.ontology_queries, function(index, value) {
      var queryvalue  = value;
      $.getJSON( ontoquery + "&querytext=" + queryvalue, function( data ) {
        $.each(data, function(index, value) {
          if (index == 0 && /\d/.test(queryvalue)) {
            $('#bioontology').append( $('<option selected="selected"></option>').val(value.child_terms).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
          } else {
            $('#bioontology').append( $('<option></option>').val(value.child_terms).html(value.id + ": " + value.label_short + " (" + value.count + ")") );       
          }
        });
      }, 'json');
    });   

    $.each( exampledata.parameters, function( key, value ) {
      var parameter = key;
      $('#' + parameter).val(value.examplevalue);
      if (value.examplevalue === "") {
        $('#' + parameter + '_group').hide();  
      } else {
        $('#' + parameter + '_group').show();  
      }
      if (value.visibility === 'hide') {
        $('#' + parameter + '_group').hide();
      }
    });

  });
});


