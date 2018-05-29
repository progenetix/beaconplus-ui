$.getJSON( "/beaconplus-server/beaconontologies.cgi", function( data ) {
  $('#bioontology').append( $('<option></option>').val("").html("(no selection)") );
  $.each(data, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
  });
}, 'json');

$.getJSON( "/beaconplus-server/beaconinfo.cgi/?q=get_datasetids", function( data ) {
  $.each(data.dataset, function(index, value) {
    $('#datasetId').append( $('<option></option>').val(value.datasetId).html(value.datasetId) );
  });
}, 'json');

$( "#toggle_intro" ).click(function() {
  $( "#intro" ).toggle( "slow", function() {});
});

$('#exampleValuesCNV').click(function(){
  $('#dgvinfo').hide();
  $('#snvinfo').hide();
  $('#structdiv').show();
  $('#structend').show();
  $('#bioontologywrapper').show();
  $("#cnvinfo").toggle( "slow", function() {});
  $('#assemblyId').val('GRCh38'); //GRCh38
  $('#datasetId').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=arraymap&querytext=ncit:c3224$", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=arraymap", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $('#bioontology').val('ncit:c3224');
  $('#referenceName').val('9');
  $('#startMin').val('19,500,000');
  $('#startMax').val('21,975,098'); // 21,975,098
  $('#endMin').val('21,967,753'); // 21,967,753
  $('#endMax').val('24,500,000');
  $('#start').val('');
  $('#alternateBases').val('');
  $('#referenceBases').val('N');
  $('#variantType').val('DEL');
  $('#intro').hide();
  $('#snvdiv').hide();
});

$('#exampleValuesBND').click(function(){
  $('#dgvinfo').hide();
  $('#snvinfo').hide();
  $('#structdiv').show();
  $('#structend').hide();
  $('#bioontologywrapper').show();
  $("#cnvinfo").toggle( "slow", function() {});
  $('#assemblyId').val('GRCh38'); //GRCh38
  $('#datasetId').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=arraymap&querytext=ncit:c3224$", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=arraymap", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $('#bioontology').val('');
  $('#referenceName').val('8');
  $('#startMin').val('127,5000,000');
  $('#startMax').val('127,900,000');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#start').val('');
  $('#alternateBases').val('');
  $('#referenceBases').val('N');
  $('#variantType').val('BND');
  $('#intro').hide();
  $('#snvdiv').hide();
});


$('#exampleValuesSNV').click(function(){
  $('#dgvinfo').hide();
  $('#cnvinfo').hide();
  $('#snvdiv').show();
  $('#bioontologywrapper').show();
  $( "#snvinfo" ).toggle( "slow", function() {});
  $('#datasetId').val('dipg');
  $('#assemblyID').val('GRCh38');
  $('#bioontology').empty();
  $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=dipg&querytext=c71.7", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconontologies.cgi?dataset_id=dipg", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $('#referenceName').val('17');
  $('#start').val('7733516');
  $('#referenceBases').val('G');
  $('#alternateBases').val('A');
  $('#variantType').val('');
  $('#startMin').val('');
  $('#startMax').val('');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#intro').hide();
  $('#structdiv').hide();
});

$('#exampleValuesDGV').click(function(){
  $('#snvinfo').hide();
  $('#cnvinfo').hide();
  $('#beaconinfotext').val('GRCh38');
  $( "#infotest" ).toggle( "slow", function() {
    // Animation complete.
  });
  $( "#dgvinfo" ).toggle( "slow", function() {
    // Animation complete.
  });
  $('#structdiv').show();
  $('#datasetId').val('dgv');
  $('#assemblyID').val('GRCh38');
  $('#bioontology').val('');
  $('#referenceName').val('6');
  $('#startMin').val('57077975');
  $('#startMax').val('57077975');
  $('#endMin').val('57081442');
  $('#endMax').val('57081442');
  $('#start').val('');
  $('#referenceBases').val('N');
  $('#alternateBases').val('');
  $('#variantType').val('DEL');
  $('#bioontologywrapper').hide();
  $('#intro').hide();
  $('#snvdiv').hide();
});

$('select[name=datasetId]').change(function () {
// TODO: changing the dataset should re-populate the ontology list
  var datasetid = $(this).val();
  if (datasetid == 'dgv') {
    $('#bioontologywrapper').hide();
  } else {
    $('#bioontology').empty();
    $.getJSON( "/beaconplus-server/beaconontologies.cgi/?dataset_id=" + datasetid, function( data ) {
      $('#bioontology').append( $('<option></option>').val("").html("(no selection)") );
      $.each(data, function(index, value) {
        $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
      });
    }, 'json');
    $('#bioontologywrapper').show();
  }
});

$('#startMin').keyup(function () {
  $('#startMax').val(this.value);
});
$('#endMin').keyup(function () {
  $('#endMax').val(this.value);
});
