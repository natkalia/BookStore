$(document).ready(function() {
  $('.deleteBook').on('click', function(e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/api/books/'+id,
      success: function(response) {
        window.location.href='/api/books';
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
});