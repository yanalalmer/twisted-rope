let btn = document.getElementById("main-btn");
let result = document.getElementById("main-result");
let loader = document.getElementById("loader");
let input = document.getElementById("main-input");
let errMsg = "<span style='color:red'>ERROR: a question should include a question mark</span>";
let errMsgTwo = "<span style='color:red'>ERROR:please type a question below</span>";
let errMsgThree = "<span style='color:red'>ERROR:somthing went wrong, please try again!</span>";
let history = document.getElementById("main-history");
let historyArr = [];

//MAIN LOGIC
btn.addEventListener("click", getInput = (e) => {
  e.preventDefault()
  validateInput()
  showHistory()
})

//VALIDATION
validateInput = () => {
  let params = input.value;
  if(params) {
    if(params.includes("?")) {
      getData()
    } else {
      result.innerHTML = errMsg;
    }
  } else {
    result.innerHTML = errMsgTwo;
  }
}

//DATA FETCHING
getData = (params) => {
  let uri = "https://8ball.delegator.com/magic/JSON/" + params;
  loader.classList.add("visible")
  fetch(uri)
    .then(response => response.json())
    .then(json => {
      let answer = json.magic.answer
      result.innerHTML = answer
      historyArr.push(answer)
    })
    .catch(err => result.innerHTML = errMsgThree) 
    .then (loading => loader.classList.remove("visible"))
}

//HANDLE HISTORY
showHistory = () => {
  let output = ''

  historyArr.forEach((element, index) => {
    if(index < 10) {
      output += '<li style="list-style: none">' + element + '</li>'
    }
  });
  history.innerHTML = output;
}