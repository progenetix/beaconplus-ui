/*
$(document).ready(function() {
    var results = new RegExp('[\?&]accessid=([^&#]*)').exec(window.location.search);
    return (results !== null) ? $('#accessid').val( value.title ) || 0 : false
});
*/

// $.getJSON( "/api/progenetix/biosubsets/mappings/shortlabel,NCIT:/", function( data ) {
//   $.each(data, function(index, value) {
//     $('#bioontology').append( $('<option></option>').val(value.child_terms.join(",")).html(value.id + ": " + value.label + " (" + value.count + ")") );
//   });
// }, 'json');

/*
using the emerging "bycon" API ...
*/

$.getJSON( window.location.origin.replace("beacon.", "bycon.")+"/get-datasetids/", function( data ) {
  $.each(data.datasets, function(index, value) {
    $('#datasetIds').append( $('<option></option>').val(value.id).html(value.name) );
  });
}, 'json');

$.getJSON( window.location.origin.replace("beacon.", "bycon.")+"/filtering_terms/prefixes=NCIT/", function( data ) {
  $.each(data.filteringTerms, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.id).html(value.id + ": " + value.label + " (" + value.count + ")") );
  });
}, 'json');


/*
$.getJSON( "/cgi-bin/beaconinfo.cgi/?querytype=get_datasetids", function( data ) {
  $.each(data.datasets, function(index, value) {
    $('#datasetIds').append( $('<option></option>').val(value.id).html(value.name) );
  });
}, 'json');
*/

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
/*    var ontoquery = "/api/"+exampledata.parameters.datasetIds.examplevalue+"/biosubsets/mappings/shortlabel,"; */
    var ontoquery = window.location.origin.replace("beacon.", "bycon.")+"/filtering_terms/datasetId="+exampledata.parameters.datasetIds.examplevalue+"/filters=";
    
    $.each(exampledata.ontology_queries, function(index, value) {
      var queryvalue  = value;
      $.getJSON( ontoquery + queryvalue, function( data ) {
/*
        $.each(data, function(index, value) {
          if (index == 0 && /\d/.test(queryvalue)) {
            $('#bioontology').append( $('<option selected="selected"></option>').val(value.child_terms.join(",")).html(value.id + ": " + value.label + " (" + value.count + ")") );
          } else {
            $('#bioontology').append( $('<option></option>').val(value.child_terms.join(",")).html(value.id + ": " + value.label + " (" + value.count + ")") );       
          }
        });
*/
        $.each(data.filteringTerms, function(index, value) {
          if (index == 0 && /\d/.test(queryvalue)) {
            $('#bioontology').append( $('<option selected="selected"></option>').val(value.id).html(value.id + ": " + value.label + " (" + value.count + ")") );
          } else {
            $('#bioontology').append( $('<option></option>').val(value.id).html(value.id + ": " + value.label + " (" + value.count + ")") );       
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


