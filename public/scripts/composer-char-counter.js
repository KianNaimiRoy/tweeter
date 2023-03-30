$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    const textAreaVal = $(this).val().length;
    // const tweetTotalChars = $(this).parent().parent().children().eq(1).children('output')
    $('.counter').text(140-textAreaVal)
    if (textAreaVal >= 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }

  });
});
