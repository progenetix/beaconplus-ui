$.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi", function( data ) {
  $('#bioontology').append( $('<option></option>').val("").html("(no selection)") );
  $.each(data, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
  });
}, 'json');

$.getJSON( "/beacon/beaconplus-server/beaconinfo.cgi/?q=get_datasetids", function( data ) {
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
  $('#bioontologywrapper').show();
  $("#cnvinfo").toggle( "slow", function() {});
  $('#assemblyId').val('GRCh38'); //GRCh38
  $('#datasetId').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?dataset_id=arraymap&querytext=ncit:c3224$", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?dataset_id=arraymap", function( data ) {
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

$('#exampleValuesSNV').click(function(){
  $('#dgvinfo').hide();
  $('#cnvinfo').hide();
  $('#snvdiv').show();
  $('#bioontologywrapper').show();
  $( "#snvinfo" ).toggle( "slow", function() {});
  $('#datasetId').val('dipg');
  $('#assemblyID').val('GRCh38');
  $('#bioontology').empty();
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?dataset_id=dipg&querytext=c71.7", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?dataset_id=dipg", function( data ) {
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
    $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?dataset_id=" + datasetid, function( data ) {
      $('#bioontology').append( $('<option></option>').val("").html("(no selection)") );
      $.each(data, function(index, value) {
        $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
      });
    }, 'json');
    $('#bioontologywrapper').show();
  }
});

// $('select[name=alternateBases]').change(function () {
//   if ($(this).val() == 'SNV') {
//     $('#snvdiv').show();
//     $('#start').prop('required',true);
//     $('#referenceBases').prop('required',true);
//     $('#alternateBases').prop('required',true);
//     $('#startMin').prop('required',false);
//     $('#startMin').val('');
//     $('#startMax').val('');
//     $('#endMin').prop('required',false);
//     $('#endMin').val('');
//     $('#endMax').val('');
//     $('#structdiv').hide();
//   } else if ($(this).val() == 'DEL' || $(this).val() == 'DUP') {
//     $('#structdiv').show();
//     $('#startMin').prop('required',true);
//     $('#endMin').prop('required',true);
//     $('#start').prop('required',false);
//     $('#start').val('');
//     $('#referenceBases').prop('required',false);
//     $('#referenceBases').val('');
//     $('#alternateBases').prop('required',false);
//     $('#alternateBases').val('');
//     $('#snvdiv').hide();
//   } else {
//     $('#snvdiv').hide();
//     $('#structdiv').hide();
//   }
// });

$('#startMin').keyup(function () {
  $('#startMax').val(this.value);
});
$('#endMin').keyup(function () {
  $('#endMax').val(this.value);
});
