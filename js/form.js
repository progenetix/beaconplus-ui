$.getJSON( "/qmongo/?db=arraymap_ga4gh&collection=bioontologies&all=values&afqfield=term_id&querytext=.&api_doctype=json", function( data ) {
  var items = [];
  $.each( data, function(i, val) {
    $('#bioontology').append( $('<option></option>').val(val).html(val) );
  });
});


$( "#toggle_intro" ).click(function() {
  $( "#intro" ).toggle( "slow", function() {});
});

$('#exampleValuesCNV').click(function(){
  $('#dgvinfo').hide();
  $('#snvinfo').hide();
  $('#structdiv').show();
  $('#bioontologywrapper').show();
  $( "#cnvinfo" ).toggle( "slow", function() {});
  $('#variantType').val('DEL');
  $('#assemblyID').val('GRCh36');
  $('#datasetId').val('arraymap');
  $('#bioontology').empty();
  $.getJSON( "/qmongo/?db=dipg_ga4gh&collection=bioontologies&all=values&afqfield=term_id&querytext=.&api_doctype=json", function( data ) {
    var items = [];
    $.each( data, function(i, val) {
      $('#bioontology').append( $('<option></option>').val(val).html(val) );
    });
  });
  $('#bioontology').val('ncit:C3224');
  $('#referenceName').val('9');
  $('#startMin').val('19000000');
  $('#startMax').val('21984490');
  $('#endMin').val('21900000');
  $('#endMax').val('25000000');
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
  $.getJSON( "/qmongo/?db=dipg_ga4gh&collection=bioontologies&all=values&afqfield=term_id&querytext=.&api_doctype=json", function( data ) {
    var items = [];
    $.each( data, function(i, val) {
      $('#bioontology').append( $('<option></option>').val(val).html(val) );
    });
  });
  $('#variantType').val('SNV');
  $('#bioontology').val('pgx:icdom:9380_3');
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

$('#exampleValuesDGV').click(function(){
  $('#snvinfo').hide();
  $('#cnvinfo').hide();
  $( "#dgvinfo" ).toggle( "slow", function() {
    // Animation complete.
  });
  $('#structdiv').show();
  $('#datasetId').val('dgv');
  $('#assemblyID').val('GRCh38');
  $('#variantType').val('DEL');
  $('#bioontology').val('');
  $('#referenceName').val('6');
  $('#startMin').val('57077975');
  $('#startMax').val('57077975');
  $('#endMin').val('57081442');
  $('#endMax').val('57081442');
  $('#start').val('');
  $('#referenceBases').val('');
  $('#alternateBases').val('');
  $('#bioontologywrapper').hide();
  $('#intro').hide();
  $('#snvdiv').hide();
});


$('select[name=datasetId]').change(function () {
// TODO: changing the dataset should re-populate the ontology list
  $('#bioontology').empty();
  $.getJSON( "/qmongo/?db=" + $(this).val() + "_ga4gh&collection=bioontologies&all=values&afqfield=term_id&querytext=.&api_doctype=json", function( data ) {
    var items = [];
    $.each( data, function(i, val) {
      $('#bioontology').append( $('<option></option>').val(val).html(val) );
    });
  });

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
