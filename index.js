const burgerMenu = document.getElementById('burgerMenu');
const closeMenu = document.getElementById('closeMenu');
const navBar = document.getElementById('navbar');
const sendButton = document.getElementById('button-sent')

// Handling navbar

let navbarOpen = false;

const openNavbar = () => {

    if (!(window.screen.width < 768)) return

    if (!navbarOpen) {
        burgerMenu.style.display = 'none';
        closeMenu.style.display = 'flex';

        navBar.animate([
            {transform: 'translate(0, 0)', offset: 0},
            {transform: 'translate(0, 250px)', offset: 1}
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        })

        navbarOpen = true;

    } else {
        burgerMenu.style.display = 'flex';
        closeMenu.style.display = 'none';

        navBar.animate([
            {transform: 'translate(0, 250px)'},
            {transform: 'translate(0, -250px)'}
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 1,
            direction: 'normal',
            fill: 'forwards'
        })

        navbarOpen = false;
    }

    
}

burgerMenu.onclick = openNavbar;
closeMenu.onclick = openNavbar;

const navButtons = document.getElementsByClassName('nav-btn');
for (var i = 0, len = navButtons.length; i < len; i++) {
  navButtons[i].addEventListener("click", openNavbar);
}

// Handling my HTML contact-me form

(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  
      var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
  
      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }
  
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            var formElements = form.querySelector(".form-elements")
            if (formElements) {
                formElements.style.visibility = "hidden"; // hide form
            }
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {

                thankYouMessage.style.visibility = "visible";

                // Disabling send button after being clicked
                sendButton.disabled = true;
                sendButton.style.cursor = 'not-allowed';

                // Animation of thank you message
                thankYouMessage.animate([
                    {transform: '', opacity: 0, offset: 0},
                    {transform: '', opacity: 1, offset: 0.2},
                    {transform: '', opacity: 1, offset: 0.8},
                    {transform: '', opacity: 0, offset: 1}
                    ], {
                    duration: 5000,
                    easing: 'linear',
                    delay: 0,
                    iterations: 1,
                    direction: 'normal',
                    fill: 'forwards'
                })

                
                sendButton.animate([
                    {transform: '', offset: 0},
                    {transform: '', background: 'grey', opacity: 0.2, boxShadow: 'none', offset: 1}
                    ], {
                    duration: 1000,
                    easing: 'linear',
                    delay: 0,
                    iterations: 1,
                    direction: 'normal',
                    fill: 'forwards'
                })


            }
          }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
    
    function loaded() {
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  })();


