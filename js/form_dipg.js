$.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi", function( data ) {
  $.each(data, function(index, value) {
    $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
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
  $('#variantType').val('DEL');
  $('#assemblyID').val('GRCh36'); //GRCh38
  $('#bioontology').empty();
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?db=dipg_ga4gh", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?db=dipg_ga4gh", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $('#bioontology').val('icdom:9440_3');
  $('#referenceName').val('9');
  $('#startMin').val('19,500,000');
  $('#startMax').val('21,964,826'); // 21,975,098
  $('#endMin').val('21,958,228'); // 21,967,753
  $('#endMax').val('24,500,000');
  $('#start').val('');
  $('#referenceBases').val('');
  $('#alternateBases').val('');
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
  $('#assemblyID').val('GRCh36');
  $('#bioontology').empty();
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?db=dipg_ga4gh&querytext=c71.7", function( data ) {
    $('#bioontology').append( $('<option></option>').val("").html("no selection") );
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option selected="selected"></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $.getJSON( "/beacon/beaconplus-server/beaconontologies.cgi?db=dipg_ga4gh", function( data ) {
    $.each(data, function(index, value) {
      $('#bioontology').append( $('<option></option>').val(value.term_id).html(value.infolabel) );
    });
  }, 'json');
  $('#variantType').val('SNV');
  $('#referenceName').val('17');
  $('#start').val('7577121');
  $('#referenceBases').val('G');
  $('#alternateBases').val('A');
  $('#startMin').val('');
  $('#startMax').val('');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#intro').hide();
  $('#structdiv').hide();
});

$('select[name=variantType]').change(function () {
  if ($(this).val() == 'SNV') {
    $('#snvdiv').show();
    $('#start').prop('required',true);
    $('#referenceBases').prop('required',true);
    $('#alternateBases').prop('required',true);
    $('#startMin').prop('required',false);
    $('#startMin').val('');
    $('#startMax').val('');
    $('#endMin').prop('required',false);
    $('#endMin').val('');
    $('#endMax').val('');
    $('#structdiv').hide();
    $('#cnvrangeimg').hide();
  } else if ($(this).val() == 'DEL' || $(this).val() == 'DUP') {
    $('#structdiv').show();
    $('#cnvrangeimg').show();
    $('#startMin').prop('required',true);
    $('#endMin').prop('required',true);
    $('#start').prop('required',false);
    $('#start').val('');
    $('#referenceBases').prop('required',false);
    $('#referenceBases').val('');
    $('#alternateBases').prop('required',false);
    $('#alternateBases').val('');
    $('#snvdiv').hide();
  } else {
    $('#snvdiv').hide();
    $('#structdiv').hide();
    $('#cnvrangeimg').hide();
  }
});

$('#startMin').keyup(function () {
  $('#startMax').val(this.value);
});
$('#endMin').keyup(function () {
  $('#endMax').val(this.value);
});
