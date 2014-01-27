/********************/
/*** Project Info ***/
/********************/

// Project Images
var topImages = [], bottomImages = [];
topImages[0] = new Image();
topImages[0].src = 'images/goodwill2.jpg';
topImages[1] = new Image();
topImages[1].src = 'images/wendy2.jpg';
topImages[2] = new Image();
topImages[2].src = 'images/yearbook2.jpg';
bottomImages[0] = new Image();
bottomImages[0].src = 'images/goodwill.jpg';
bottomImages[1] = new Image();
bottomImages[1].src = 'images/wendy.jpg';
bottomImages[2] = new Image();
bottomImages[2].src = 'images/yearbook.jpg';

// Project Details
var details = [
                { 'ptitle': 'Project: Goodwill Tracker',
                  'subtitle': 'Javascript/Ruby on Rails',
                  'details': "Goodwill Tracker was born from the idea of 'Paying it Forward'. I wanted to create a social platform where people could perform random acts of kindness and see not only what happened as a result of their compassion, but where that compassion spread to.",
                  'url': 'http://goodwill-tracker.herokuapp.com/',
                  'github': 'https://github.com/jamkcas/goodwill'
                },
                { 'ptitle': 'Project: Portfolio',
                  'subtitle': 'Javascript',
                  'details': "This project is the portfolio for Wendy, who is a UX Designer. Wendy was looking to update her previous portfolio, and really highlight the work she has done for the past 15 years.",
                  'url': 'http://perlgirl.net/'
                },
                { 'ptitle': 'Project: GA Yearbook',
                  'subtitle': 'Javascript',
                  'details': "This was a collaborative project with 3 of my classmates from the General Assembly Web Development Immersive program.  We were tasked with creating an online yearbook for our cohort, to showcase each student and their, as well as the program itself.",
                  'url': 'http://sfwebdevs.github.io/',
                  'github': 'https://github.com/sfwebdevs/sfwebdevs.github.io'
                },
              ];

/*********************/
/*** About me info ***/
/*********************/

var profileImage = new Image();
profileImage.src = 'images/portfolio_profile.jpg';
var aboutMeDetails = 'I am a full-stack engineer transitioning into web development from the customer service industry, after having recently found a passion for programming. I enjoy the nature of the industry, which encourages both a collaborative environment, as well as independent work and growth. Engineering meshes well with my inquisitive nature, and my ability to logically break down complex problems into elegant and manageable solutions. My interest and focus has gravitated more to front-end development, however I am open to and enjoy the full-stack environment..'

/*************************/
/*** On Load Functions ***/
/*************************/

$(function() {
  // Getting the height and width to use for animated masks later
  var height = $('.projectFrameRight').height();
  var width = $('.projectFrameRight').width();
  // Setting a project count index as well as initializing a status variable to keep track of left/right status
  var projectCounter = 0, status;
  // Hiding the project frames until projects are being shown
  $('.projectFrameRight').hide().fadeOut();
  $('.projectFrameLeft').hide().fadeOut();

  window.onresize = function() {
    // Setting the height and width variables to the new project frame height and width when window resizes
    height = $('.projectFrameRight').height();
    width = $('.projectFrameRight').width();
    // Making sure the details are displayed when resizing above 1000px and dont display when equal to or below 1000px, unless the about me page is being shown
    if($(window).width() > 1000) {
      $('.rightDetails').css('display', 'inline-block');
      $('.leftDetails').css('display', 'inline-block');
    } else {
      $('.rightDetails').css('display', 'none');
      $('.leftDetails').css('display', 'none');
      if($('.about').hasClass('active')) {
        $('.rightDetails').css('display', 'inline-block');
        $('.leftDetails').css('display', 'inline-block');
      }
    }
  };

  // Function to set the details based on what side the project or about me is being displayed on, using the projectCounter index to reference the correct info from the details and images arrays
  var setDetails = function(side, page) {
    if(side === 'left') {
      if(page === 'about') {
        $('.leftTitle').text('About Me');
        $('.leftSubtitle').text('');
        $('.leftDetails').text(aboutMeDetails);
        $('.leftImage').attr('src', profileImage.src);
        $('.leftImage2').attr('src', '');
        $('.leftLinks.url').hide();
        $('.leftLinks.github').hide();
      } else {
        $('.leftTitle').text(details[projectCounter].ptitle);
        $('.leftSubtitle').text(details[projectCounter].subtitle);
        $('.leftDetails').text(details[projectCounter].details);
        if(details[projectCounter].github) {
          $('.leftLinks.github a').attr('href', details[projectCounter].github);
          $('.leftLinks.github').show();
        } else {
          $('.leftLinks.github').hide();
        }
        if(details[projectCounter].url) {
          $('.leftLinks.url a').attr('href', details[projectCounter].url);
          $('.leftLinks.url').show();
        } else {
          $('.leftLinks.url').hide();
        }
        $('.leftImage').attr('src', topImages[projectCounter].src);
        $('.leftImage2').attr('src', bottomImages[projectCounter].src);
      }
    } else {
      if(page === 'about') {
        $('.rightTitle').text('About Me');
        $('.rightSubtitle').text('');
        $('.rightDetails').text(aboutMeDetails);
        $('.rightImage').attr('src', profileImage.src);
        $('.rightImage2').attr('src', '');
        $('.rightLinks.url').hide();
        $('.rightLinks.github').hide();
      } else {
        $('.rightTitle').text(details[projectCounter].ptitle);
        $('.rightSubtitle').text(details[projectCounter].subtitle);
        $('.rightDetails').text(details[projectCounter].details);
        if(details[projectCounter].github) {
          $('.rightLinks.github a').attr('href', details[projectCounter].github);
          $('.rightLinks.github').show();
        } else {
          $('.rightLinks.github').hide();
        }
        if(details[projectCounter].url) {
          $('.rightLinks.url a').attr('href', details[projectCounter].url);
          $('.rightLinks.url').show();
        } else {
          $('.rightLinks.url').hide();
        }
        $('.rightImage').attr('src', topImages[projectCounter].src);
        $('.rightImage2').attr('src', bottomImages[projectCounter].src);
      }
    }
  };

  // Function to perform the behaviors of the project when the about me, home, my work, next, or previous buttons are clicked
  var setProject = function(element, direction, command) {
    // Showing the swipeRight or swipeLeft mask and setting its attributes
    element.show();
    element.css('width', width + 60);
    element.css('height', height + 60);
    element.css('padding', '30px');
    element.css('top', '15px');
    // Setting the direction to move the masks as well the element to fade in or fade out depending on which button is clicked
    if(direction === 'left' || direction === 'homeLeft') {
      element.css('right', -(width + 60));
      var moveDirection = {'right': 60};
      var fOut = $('.projectFrameRight');
      if(direction === 'homeLeft') {
        var fIn = $('.philosophy');
      } else {
        var fIn = $('.projectFrameLeft');
      }
    } else if(direction === 'right' || direction === 'homeRight') {
      element.css('left', -(width + 60));
      var moveDirection = {'left': 60};
      var fOut = $('.projectFrameLeft');
      if(direction === 'homeRight') {
        var fIn = $('.philosophy');
      } else {
        var fIn = $('.projectFrameRight');
      }
    }
    // Cloning the first mask and appending it to the main container
    var element2 = element.clone();
    $('.main').append(element2);
    // Moving the mask in the direction set earlier
    element.animate(moveDirection, {complete: function() {
        // Upon completion of the mask animation the current displayed element is faded out, and the new element is faded in
        // This is for when the home page is displayed
        if($('.philosophy').css('display') != "none") {
          $('.philosophy').fadeOut(0, function() {
            // Showing the details (this is for the mobile view of the about me page)
            $('.rightDetails').css('display', 'inline-block');
            $('.leftDetails').css('display', 'inline-block');
            if(command === 'project') {
              // Hiding the details if the window size is less then 1000px wide and the about me page isnt active
              if($(window).width() < 1000) {
                $('.rightDetails').css('display', 'none');
                $('.leftDetails').css('display', 'none');
              }
            }
            fIn.fadeIn(400);
          });
          element.fadeOut();
        // This is for when the home page isnt being displayed
        } else {
          fOut.fadeOut(0, function() {
            // Adjusting the active dot
            $('.dot').removeClass('nextActive');
            var dot = '.dot' + projectCounter.toString();
            $(dot).addClass('nextActive');
            // Showing the details (this is for the mobile view of the about me page)
            $('.rightDetails').css('display', 'inline-block');
            $('.leftDetails').css('display', 'inline-block');
            if(command === 'project') {
              $('.images').css('margin-bottom', '0px');
              $('.next').fadeIn(0);
              if($(window).width() < 1000) {
                // Hiding the details if the window size is less then 1000px wide and the about me page isnt active
                $('.rightDetails').css('display', 'none');
                $('.leftDetails').css('display', 'none');
              }
            }
            fIn.fadeIn(400);
          });
          // Fading out the swipeRight or swipeLeft element
          element.fadeOut();
        }
      }
    });
    // Setting a delayed animation of the cloned mask to run a split second after the first mask runs
    setTimeout(function() {
      element2.animate(moveDirection, {complete: function() {
          // Upon completion the cloned mask is removed
          element2.remove();
        }
      });
    }, 100);
    // Changing the left/right status to whatever the current direction is
    status = direction;
  };

  // Event for when the home button is clicked
  $('.home').click(function() {
    // Removing the active status from the about me div
    $('.about').removeClass('active');
    // If the current home page isnt displayed then an animation is run to clear the current project based on which side is currently active, and show the home page
    if($('.philosophy').css('display') === 'none') {
      if(status === 'left') {
        var right = $('.swipeRight');
        setProject(right, 'homeRight', 'project');
      } else {
        var left = $('.swipeLeft');
        setProject(left, 'homeLeft', 'project');
      }
    }
  });

  // Event for when the about me button is clicked
  $('.about').click(function() {
    // Adding the active status from the about me div (for use in the mobile view)
    $('.about').addClass('active');
    // Fading out the pagination buttons and dots and adjusting the margin-bottom on the image to keep the project frame from collapsing
    $('.next').fadeOut(400, function() {
      $('.images').css('margin-bottom', '45px');
    });
    // Removing the current content and displaying the about me content on the opposite side of the page
    if(status === 'left') {
      setDetails('right', 'about');
      var right = $('.swipeRight');
      setProject(right, 'right');
    } else {
      setDetails('left', 'about');
      var left = $('.swipeLeft');
      setProject(left, 'left');
    }
  })

  // Event for when my work button is clicked
  $('.myWork').click(function() {
    // Removing the active status from the about me div
    $('.about').removeClass('active');
    // Resetting the project index to 0
    projectCounter = 0;
    // Removing the current content and displaying the project content on the opposite side of the page
    if(status === 'right') {
      setDetails('left');
      var left = $('.swipeLeft');
      setProject(left, 'left', 'project');
    } else {
      setDetails('right');
      var right = $('.swipeRight');
      setProject(right, 'right', 'project');
    }
  });

  // Event for when next/previous button is clicked
  $('.navButtons').on('click', 'p', function() {
    // Setting the project index to be 1 more or less then the current index based on whether next/previous button is clicked. If the index goes beyond the range of the details array then index resets to the other end of the array
    if($(this).hasClass('nextProject')) {
      if(projectCounter === details.length - 1) {
        projectCounter = 0;
      } else {
        projectCounter += 1;
      }
    } else {
      if(projectCounter === 0) {
        projectCounter = details.length - 1;
      } else {
        projectCounter -= 1;
      }
    }
    // Removing the current content and displaying the project content on the opposite side of the page
    if(status === 'right') {
      setDetails('left');
      var left = $('.swipeLeft');
      setProject(left, 'left', 'project');
    } else {
      setDetails('right');
      var right = $('.swipeRight');
      setProject(right, 'right', 'project');
    }
  });

  // For mobile
  $.mobile.ignoreContentEnabled = true;
  $.mobile.defaultPageTransition = 'slide';
  // Swipe event for paging left
  $('.images').on("swiperight", function(event){
    event.stopImmediatePropagation();
    // Setting the index
    if(projectCounter === details.length - 1) {
      projectCounter = 0;
    } else {
      projectCounter += 1;
    }
    // Removing the current content and displaying the project content on the opposite side of the page
    if(status === 'right') {
      setDetails('left');
      var left = $('.swipeLeft');
      setProject(left, 'left', 'project');
    } else {
      setDetails('right');
      var right = $('.swipeRight');
      setProject(right, 'right', 'project');
    }
  });

  // Swipe event for paging right
  $('.images').on("swipeleft", function(event){
    event.stopImmediatePropagation();
    // Setting the index
    if(projectCounter === 0) {
      projectCounter = details.length - 1;
    } else {
      projectCounter -= 1;
    }
    // Removing the current content and displaying the project content on the opposite side of the page
    if(status === 'right') {
      setDetails('left');
      var left = $('.swipeLeft');
      setProject(left, 'left', 'project');
    } else {
      setDetails('right');
      var right = $('.swipeRight');
      setProject(right, 'right', 'project');
    }
  });

  // Event for when a dot is clicked
  $('.dot').click(function() {
    // Setting the active state to the dot that is clicked after removing the active state of the old active dot
    $('.dot').removeClass('nextActive');
    $(this).addClass('nextActive');
    // Setting the project index based on the dot which was pressed
    if($(this).hasClass('dot0')) {
      projectCounter = 0;
    } else if($(this).hasClass('dot1')) {
      projectCounter = 1;
    } else {
      projectCounter = 2;
    }
    // Removing the current content and displaying the project content on the opposite side of the page
    if(status === 'right') {
      setDetails('left');
      var left = $('.swipeLeft');
      setProject(left, 'left', 'project');
    } else {
      setDetails('right');
      var right = $('.swipeRight');
      setProject(right, 'right', 'project');
    }
  });
});