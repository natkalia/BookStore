$(document).ready(function() {
  $('.deleteBook').on('click', function(e) {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/api/books/'+id,
    })
    .done((res) => {
      window.location.href='/api/books';
    })
    .fail((res) => {
      alert(res.responseText);
      console.log('Error', res.status, res.responseText);
    })
  })
});