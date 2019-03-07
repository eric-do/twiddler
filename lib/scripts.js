/* Submit new Tweet */
$(document).ready(function(){
  var visitor = 'Eric';
  outputTweets(streams.home);

  $(function() {
    $('#new-post').keydown(function(e){
      var message = $('#new-post').val();
      if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
        var message = $('#new-post').val();
        if (streams.users[visitor] === undefined) { streams.users[visitor] = []; }
        writeTweet(message);
        $('#new-post').val('');
        outputTweets(streams.home);
      }
    });
  });

  /* Textarea placeholder */
  $(function() {
    $('#new-post').focus(function() {
      $(this).attr('placeholder','Hint: CTRL/CMD + ENTER to post new Tweet');
    });
  });

  $(function() {
    $('#new-post').blur(function() {
      $(this).attr('placeholder', 'What\'s happening?');
    });
  });

  $('.reload').click(function() {
    outputTweets(streams.home);
  });

  /* Click uesrname to view user wall */
  $(function() {
    $('.tweet-container').on('click', '.user-link', function() {
      var username = this.text.substring(1);
      var tweetArray = streams.home.filter(function(tweet){
        return tweet.user === username;
      });
      outputTweets(tweetArray);
    });
  });
});

/* Display tweets */
function outputTweets(tweetArray) {
  $('.tweet-container').empty();
    for (var i = 0; i < tweetArray.length; i++) {
    var tweet = tweetArray[i];
    var $tweet = formatTweet(tweet);
    $tweet.prependTo('.tweet-container');
  }
  $('.tweet-container').appendTo('.tweet-section');
}

function formatTweet(tweet) {
  var $tweet = $('<div></div>');
  var $tweetText = $('<p>' + tweet.message + '</p>');
  var $avatar = $('<img class="avatar">');
  var avatarURL = getAvatar(tweet.user);
  var $username = $('<span class="username">@' + tweet.user + '</span>');
  var $userLink = $('<a></a>');
  var formattedTime = getFormattedTime(tweet.created_at);
  var $tweetDate = $('<p>' + formattedTime + '</p>');

  $tweetDate.addClass('tweet-date');
  $avatar.attr('src', avatarURL);
  $avatar.appendTo($tweet);
  $userLink.addClass('user-link');
  $userLink.appendTo($tweet);
  $username.addClass('content');
  $username.appendTo($userLink);
  $tweetDate.appendTo($tweet);
  $tweetText.appendTo($tweet);
  $tweetText.addClass('tweet-text content');
  $tweet.addClass("tweet tweet-card");

  return $tweet;
}

function getAvatar(username) {
  return 'https://api.adorable.io/avatars/285/' + username;
}

function getFormattedTime(tweetDate) {
  return moment(tweetDate).fromNow();
}
