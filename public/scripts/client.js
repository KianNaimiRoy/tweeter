/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //hiding error messages
  $('#error-message').hide();
  // Fake data taken from initial-tweets.json
  const renderTweets = function(tweets) {

    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    //gets the tweets from /tweets and renders them on the page
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();
  //a helper function to make calling errors easier.
  const displayError = function(message) {
    $('#error-message').html(message);
    return $('#error-message').slideDown(400);
  };
  //makes a tweet object that is then passed to the database
  const createTweetElement = function(tweet) {
    //timestamps
    const timeAgo = timeago.format(tweet.created_at);
    //escapes the user input for security
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //this is the actual html for the tweet
    const $dynamicTweet = `<article>
    <div class="header">
    <img #id="user-pic" src=${tweet.user.avatars}/>
        <p class="user-name">${tweet.user.name}</p>
        <p class="user-handle">
        ${tweet.user.handle}
        </p>
    </div>
      <p class="latest-tweets">
      ${escape(tweet.content.text)}
      </p>
      <footer>${timeAgo}
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $dynamicTweet;
  };
  //tweet button logic
  $('form').on('submit', (event) => {
    $('#CommentBox').val('');
    $('.counter').val(140);

    //stops the browser sunning default operations
    event.preventDefault();
    //error message triggers
    const $tweetLength = $('textarea').val().length;
    if (!$tweetLength) {
      return displayError("Oh no! Can't tweet an empty tweet.");
    }
    if ($tweetLength > 140) {
      return displayError("The tweet length is over 140 characters.");
    }
    //turns encoded url into a serialized string
    const encodedURL = $('form').serialize();
    $('#tweet-text').val('');


    //ajax method to actually post the created tweet after the button has been pressed
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: encodedURL,
    }).then((response) => {
      loadTweets();
      $('#error-message').slideUp(400);
    }).catch((err) => {
      return displayError("Something went wrong! please try again.");
    });
  });
});


