$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    const textAreaVal = $(this).val().length;
    const tweetTotalChars = $(this).parent().parent().children().eq(1).children('output').val(140 - textAreaVal);

    if (textAreaVal >= 140) {
      tweetTotalChars.css('color', 'red');
    } else {
      tweetTotalChars.css('color', '#545149');
    }
  });
});
