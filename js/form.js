$.getJSON( "/beaconplus-server/beaconinfo.cgi/?querytype=ontologyids&querytext=ncit:", function( data ) {
  $.each(data, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
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

$('#exampleValuesCNV').click(function(){
  $('#dgvinfo').hide();
  $('#snvinfo').hide();
  $('#group_structvar').show();
  $('#group_rangestart').show();
  $('#group_rangeend').show();
  $('#group_rangestart_max').show();
  $('#group_rangeend_min').show();
  $('#bioontologywrapper').show();
  $("#cnvinfo").toggle( "slow", function() {});
  $('#assemblyId').val('GRCh38'); //GRCh38
  $('#datasetIds').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=arraymap&querytext=ncit:c3224&querytype=ontologyids", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=arraymap&querytext=ncit:&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.id + "$").html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=arraymap&querytext=icdom:&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.id + "$").html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
// Example for focal CDKN2A deletion matches
  $('#referenceName').val('9');
  $('#startMin').val('19,500,000');
  $('#startMax').val('21,975,098'); // 21,975,098
  $('#endMin').val('21,967,753'); // 21,967,753
  $('#endMax').val('24,500,000');
  $('#variantType').val('DEL');
// 
  $('#start').val('');
  $('#alternateBases').val('N');
  $('#referenceBases').val('*');
  $('#intro').hide();
  $('#group_refalt').hide();
  $('#group_start').hide();
});

$('#exampleValuesBND').click(function(){
  $('#snvinfo').hide();
  $('#bioontologywrapper').show();
  $('#group_structvar').show();
  $("#cnvinfo").toggle( "slow", function() {});
  $('#assemblyId').val('GRCh38'); //GRCh38
  $('#datasetIds').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=arraymap&querytext=ncit:c3224$&querytype=ontologyids", function( data ) {
   $('#bioontology').append( $('<option></option>').val("").html("no selection") );
   $.each(data, function(index, value) {
     $('#bioontology').append( $('<option selected="selected"></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
   });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=arraymap&querytext=ncit:&querytype=ontologyids", function( data ) {
   $.each(data, function(index, value) {
     $('#bioontology').append( $('<option></option>').val(value.id + "$").html(value.id + ": " + value.label_short + " (" + value.count + ")") );
   });
  }, 'json');
  $('#referenceName').val('8');
  $('#startMin').val('127,500,000');
  $('#startMax').val('127,900,000');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#start').val('');
  $('#alternateBases').val('N');
  $('#referenceBases').val('*');
  $('#variantType').val('BND');
  $('#intro').hide();
  $('#group_refalt').hide();
  $('#group_start').hide();
  $('#group_rangeend').hide();
});

$('#exampleValuesSNVrange').click(function(){
  $('#cnvinfo').hide();
  $('#group_refalt').show();
  $('#group_rangestart').show();
  $('#group_rangeend').show();
  $('#bioontologywrapper').show();
  $( "#snvinfo" ).toggle( "slow", function() {});
  $('#datasetIds').val('dipg');
  $('#assemblyID').val('GRCh38');
  $('#bioontology').empty();
  $('#bioontology').append( $('<option></option>').val("").html("no selection") );
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=dipg&querytext=icdot:c71.7&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconinfo.cgi?datasetIds=dipg&querytext=...&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
// Example for EIF4A1 transcript region matches (precise variants)
  $('#referenceName').val('17');
  $('#referenceBases').val('*');
  $('#alternateBases').val('N');
  $('#startMin').val('7,572,826');
  $('#startMax').val('');
  $('#endMin').val('');
  $('#endMax').val('7,579,005');
// 
  $('#variantType').val('');
  $('#start').val('');
  $('#intro').hide();
  $('#group_start').hide();
  $('#group_structvar').hide();
  $('#group_rangestart_max').hide();
  $('#group_rangeend_min').hide();
});

$('#exampleValuesSNV').click(function(){
  $('#dgvinfo').hide();
  $('#cnvinfo').hide();
  $('#group_start').show();
  $('#group_refalt').show();
  $('#bioontologywrapper').show();
  $( "#snvinfo" ).toggle( "slow", function() {});
  $('#datasetIds').val('dipg');
  $('#assemblyID').val('GRCh38');
  $('#bioontology').empty();
  $('#bioontology').append( $('<option></option>').val("").html("no selection") );
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?datasetIds=dipg&querytext=icdot:c71.7&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
  $.getJSON( "/beaconplus-server/beaconinfo.cgi?datasetIds=dipg&querytext=...&querytype=ontologyids", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.id).html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
// Example for EIF4A1 specific single match (precise variants)
  $('#referenceName').val('17');
  $('#start').val('7577121');
  $('#referenceBases').val('G');
  $('#alternateBases').val('A');
//
  $('#variantType').val('');
  $('#startMin').val('');
  $('#startMax').val('');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#intro').hide();
  $('#group_rangestart').hide();
  $('#group_rangeend').hide();
  $('#group_structdiv').hide();
});

$('#datasetIds').on('change', function() {
  var datasetid = $(this).val();
  $('#bioontology').empty();
  $('#bioontology').append( $('<option></option>').val("").html("(no selection)") );
  $.getJSON( "/beaconplus-server/beaconinfo.cgi/?querytext=...&querytype=ontologyids&datasetIds=" + datasetid, function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.id + "$").html(value.id + ": " + value.label_short + " (" + value.count + ")") );
    });
  }, 'json');
  $('#bioontologywrapper').show();
});

$('#startMin').keyup(function () {
  $('#startMax').val(this.value);
});
$('#endMin').keyup(function () {
  $('#endMax').val(this.value);
});
