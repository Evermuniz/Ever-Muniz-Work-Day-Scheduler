// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  var currentDate = dayjs().format('MMM D, YYYY'); //declaring a variable with today's date using dayjs
  $('#currentDay').text(currentDate); //using jquery to select the p element in HTML with #currentDay id and setting text content to display today's date

  $('.saveBtn').on('click', function (){ //using jquery to select all save buttons in HTML and trigger this function when they are clicked
    var id = $(this).parent().attr("id"); //this variable value is defined  through several steps. First, by which save button was clicked which is why we need "this". 
    //then we check the button parent, which is the div. Then we check for the value of the id assigned to the same parent. The value will be the respective time slot in HTML
    var contents = $(this).siblings("textarea").val(); //this variable is checking for the user input in the webpage. Once they have clicked save, then we will 
    //check the button sibling to make sure we reference the right time slot. The text is then the value of the contents variable
    localStorage.setItem(id, JSON.stringify(contents)); //We then want to save the input in local storage. By using the id value as the key and the 
    //contents input as the values then we can easily save and display the input in the respective time slot even after refreshing the page
  });

  var currentTime = dayjs().format("HH"); //creating a new variable with today's date as the value by using day.js library
  console.log(currentTime);// logging this was very helpful to determine if everything was working as expected

  $('.time-block').each(function() { //using jquery to select all divs with a time-block class. Using the each to repeat this function for every div with this class
  var timeBlock = $(this).attr("id"); //similar to the id variable used above, we're checking for the id value which gives us the repective time slot.
  //the only difference is that we are checking this directly in the div and don't need to reference  a relative and only need to use "this"
  console.log(timeBlock);// also very helpful to check everything is working as expected
  if (currentTime > timeBlock) {$(this).addClass("past");} //if the current time is greater than the time slot, then apply the "past" class
  if (currentTime === timeBlock) {$(this).addClass("present");} //if the current time is greater than the time slot, then apply the "present" class
  if (currentTime < timeBlock) {$(this).addClass("future");} //if the current time is greater than the time slot, then apply the "future" class

  var description = $(this).children("textarea");//Using "this" to select the child element with the "text area  class which is where text is entered and displayed on the page"
  var storedData = JSON.parse(localStorage.getItem(timeBlock));//Using JSON to parse and retrieve what was saved in local storage earlier
  //we're using the timeblock variable so we can match the id value from "this" to the same key value in local storage since we used the same id to set it in the first place
  description.text(storedData); //Finally, we display the value of the respective key in the respective time slot
  });

});
