$(function() {

  $( "#" + geneinput_field ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "/cgi-bin/genespans.cgi",
        dataType: "jsonp",
        data: {
          featureClass:  "P",
          maxRows:    12,
          db: "progenetix",
          collection: "genespans",
          querytext:  request.term,
        },
        success: function( data ) {
          response( $.map( data.genes, function( item ) {
            return [
            {
              label: "[" + item.gene_symbol + "]" + " " + item.reference_name + ":" + item.cds_start_min + "-" + item.cds_end_max,
              referenceName: item.reference_name,
              startMin: item.cds_start_min,
              startMax: item.cds_end_max - 1,
              endMin: item.cds_start_min +1,
              endMax: item.cds_end_max
            }
            ]
          }));
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
        $("#referenceName").val(ui.item.referenceName);
        $("#startMin").val(ui.item.startMin);
        $("#startMax").val(ui.item.startMax);
        $("#endMin").val(ui.item.endMin);
        $("#endMax").val(ui.item.endMax);
/**          $(this).val('');
        return false;
**/
    },
    open: function() {
      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    },
    close: function() {
      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    }
  });
});

