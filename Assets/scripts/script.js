//Hamburger menu function
$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
        $(".navbar-divider").toggleClass("display-block");
  
    });
});

//Fetch my repo's off of Github with a topic of 'portfolio'
//Array to store relevant repos
var portfolioArray = []

function fetchRepos() {
    fetch('https://api.github.com/users/kevinchewning/repos')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var repo = {
            name: "",
            screenshot: "",
            description: "",
            technologies: [],
            readme: "",
            github: "",
            page: ""
        }

        for(let i = 0; i < data.length; i++) {
            var topicsURL = "https://api.github.com/repos/kevinchewning/" + data[i].name +"/topics"
            var content = data[i].contents_url;
            var contentURL = content.slice(0, -7);
            var portfolioTag;

            fetch(topicsURL, {
                "method": "GET",
                "headers": {
                    "accept" : "application/vnd.github.v3+json"
                }
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data);
                    //portfolioTag = data.includes('portfolio');
                })
            
            if (portfolioTag) {
                repo.name = data[i].name;
                

            }
        }
    })
}

fetchRepos();

//Convert README to HTML
var converter = new showdown.Converter(),
    text      = '# hello, markdown!',
    html      = converter.makeHtml(text);