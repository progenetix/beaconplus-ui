$( "#toggle_intro" ).click(function() {
  $( "#intro" ).toggle( "slow", function() {
    // Animation complete.
  });
});

$('#exampleValuesCNV').click(function(){
  $('#structdiv').show();
  $('#variantType').val('DEL');
  $('#assemblyID').val('GRCh36');
  $('#datasetId').val('arraymap');
  $('#bioontology').val('ncit:C3224');
  $('#referenceName').val('9');
  $('#startMin').val('19000000');
  $('#startMax').val('21984490');
  $('#endMin').val('21900000');
  $('#endMax').val('25000000');
  $('#start').val('');
  $('#referenceBases').val('');
  $('#alternateBases').val('');
  $('#snvdiv').hide();
});

$('#exampleValuesSNV').click(function(){
  $('#snvdiv').show();
  $('#datasetId').val('dipg');
  $('#assemblyID').val('GRCh36');
  $('#bioontology').val('pgx:icdom:9380_3');
  $('#referenceName').val('17');
  $('#start').val('7577121');
  $('#referenceBases').val('G');
  $('#alternateBases').val('A');
  $('#startMin').val('');
  $('#startMax').val('');
  $('#endMin').val('');
  $('#endMax').val('');
  $('#structdiv').hide();
});

$('#exampleValuesDGV').click(function(){
  $('#structdiv').show();
  $('#datasetId').val('dgv');
  $('#assemblyID').val('GRCh38');
  $('#variantType').val('DEL');
  $('#bioontology').val('');
  $('#referenceName').val('9');
  $('#startMin').val('21029331');
  $('#startMax').val('21029331');
  $('#endMin').val('21199681');
  $('#endMax').val('21199681');
  $('#start').val('');
  $('#referenceBases').val('');
  $('#alternateBases').val('');
  $('#snvdiv').hide();
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
