$(function() {

  $( "#" + cytoinput_field ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "/cgi-bin/bycon/bin/cytomapper.py",
        dataType: "jsonp",
        data: {
          featureClass:  "P",
          maxRows:    2,
          cytoBands:  request.term
        },
        success: function( data ) {
          response( $.map( data.data, function( item ) {
            return [
            {
              label: item.referenceName + ":" + item.start + "-" + item.end,
              referenceName: item.referenceName,
              startMin: item.start,
              startMax: item.end - 1,
              endMin: item.start + 1,
              endMax: item.end
            }
            ]
          }));
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
        $("#geneinputField").empty();
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

