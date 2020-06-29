/*
$(document).ready(function() {
    var results = new RegExp('[\?&]accessid=([^&#]*)').exec(window.location.search);
    return (results !== null) ? $('#accessid').val( value.title ) || 0 : false
});
*/

$( "#toggle_intro" ).click(function() {
  $( "#intro" ).toggle( "slow", function() {});
});

$.each( requestTypes, function( key, value ) {
  var rType = key;
  var rParameters = value;

  $( "#request_type_group" ).append( '<div id="' + rType + '" class="btn btn-info" style="float: left; background-color: #6699ff; margin: -7px 5px 0px 0px;">' + rParameters.label + '</div>');

  $('#' + rType).click(function(){
    $('#beacon-form').trigger("reset");
    $('#intro-info').html(rParameters.description);
    $('#intro-info').show();

    $.each( rParameters.parameters, function( key, value ) {
      var parameter = key;
      if (parameter === "requestType") {
      	$('#requestType').val(value.value);
      } else {
      	$('#' + parameter).attr("placeholder", "example: "+value.placeholder);
      }
      if (value.visibility === 'hide') {
        $('#' + parameter + '_group').hide();
      } else {
        $('#' + parameter + '_group').show();
      }
    });
  });
});

// $.getJSON( "/api/progenetix/biosubsets/mappings/shortlabel,NCIT:/", function( data ) {
//   $.each(data, function(index, value) {
//     $('#bioontology').append( $('<option></option>').val(value.child_terms.join(",")).html(value.id + ": " + value.label + " (" + value.count + ")") );
//   });
// }, 'json');

/*
using the emerging "bycon" API ...
Using the shortcut through the "bycon.progenetix.org" subdomain would violate CORS
  => absolute web path rooted in "cgi" (or "cgi-bin)
*/

var bycon =  window.location.origin+"/cgi/bycon/bin/byconplus.py"

$.getJSON( bycon+"/get-datasetids/", function( data ) {
  $.each(data.datasets, function(index, value) {
    $('#datasetIds').append( $('<option></option>').val(value.id).html(value.name) );
  });
}, 'json');

$.getJSON( bycon+"/filtering_terms?prefixes=NCIT", function( data ) {
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
    var ontoquery = bycon+"/filtering_terms?datasetIds="+exampledata.parameters.datasetIds.examplevalue+"&filters=";
    
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


