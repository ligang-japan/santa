

// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');
const USERS_URL = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
const PROFILES_URL = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
const SERVER_URL = "http://localhost:3000";
const inputName = document.getElementById("username");
const inputWish = document.getElementById("wish");
const divDefault = document.getElementById("default");
const divNormal = document.getElementById("normal");
const divError = document.getElementById("error");
const inputBack = document.getElementById("back");
let clearName = undefined;
let clearWish = undefined;
function goBack() {
  if (divDefault.classList.contains("hide")) {
    divDefault.classList.toggle("hide");
  }

  if (!divError.classList.contains("hide")) {
    divError.classList.toggle("hide");
  }

  if (!divNormal.classList.contains("hide")) {
    divNormal.classList.toggle("hide");
  }

  if (!inputBack.classList.contains("hide")) {
    inputBack.classList.toggle("hide");
  }
  if (clearName) {
    inputName.value = "";
  }
  if (clearWish) {
    inputWish.value = "";
  }
}

// define variables that reference elements on our page
const santaForm = document.forms[0];

// listen for the form to be submitted and add a new dream when it is
santaForm.onsubmit = async function (event) {
  event.preventDefault();

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }



  if (!inputName.value) {
    if (!divDefault.classList.contains("hide")) {
      divDefault.classList.toggle("hide");
    }

    if (divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }

    if (!divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }

    if (inputBack.classList.contains("hide")) {
      inputBack.classList.toggle("hide");
    }

    divError.innerHTML = "Plese enter your name.";
    clearName = false;
    clearWish = false;

    return;
  }

  if (!inputWish.value) {
    if (!divDefault.classList.contains("hide")) {
      divDefault.classList.toggle("hide");
    }

    if (divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }

    if (!divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }

    if (inputBack.classList.contains("hide")) {
      inputBack.classList.toggle("hide");
    }

    divError.innerHTML = "Plese enter your wish.";
    clearName = false;
    clearWish = false;

    return;
  }
  const _users = await axios(USERS_URL);
  const users = await _users.data;
  const _profiles = await axios(PROFILES_URL);
  const profiles = await _profiles.data
  const inputUser = users.filter(user => user.username === inputName.value);

  if ((inputUser.length) < 1) {
    if (!divDefault.classList.contains("hide")) {
      divDefault.classList.toggle("hide");
    }

    if (divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }

    if (!divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }

    if (inputBack.classList.contains("hide")) {
      inputBack.classList.toggle("hide");
    }
    divError.innerHTML = "Your request has not been accepted as you are not registered";
    return;
  }

  const targetProfile = profiles.filter(profile => (profile.userUid === inputUser[0].uid));

  if (getAge(targetProfile[0].birthdate) > 10) {
    if (!divDefault.classList.contains("hide")) {
      divDefault.classList.toggle("hide");
    }

    if (divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }

    if (!divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }

    if (inputBack.classList.contains("hide")) {
      inputBack.classList.toggle("hide");
    }
    divError.innerHTML = 'Your request has not been accepted as you are more than 10 years old.<br><br>';
    return;


  }


  try {
    const response = await axios.post(SERVER_URL, {
      username: inputName.value,
      address: targetProfile[0].address,
      request: inputWish.value,
      pending: true
    });
    if (response.status = 200) {
      divNormal.innerHTML = 'Your request has been accepted.<br><br>';
      clearName = true;
      clearWish = true;
    } else {
      divNormal.innerHTML = 'Something unexpected happened. <br>Please click on the <span style="font-style: italic;">Go back</span> button to try again after a while<br><br>';
    }
    if (divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }
    if (!divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }
  } catch {
    if (!divNormal.classList.contains("hide")) {
      divNormal.classList.toggle("hide");
    }
    if (divError.classList.contains("hide")) {
      divError.classList.toggle("hide");
    }
    divError.innerHTML = 'Something unexpected happened. <br>Please click on the <span style="font-style: italic;">Go back</span> button to try again after a while<br><br>';
    clearName = false;
    clearWish = false;
  }
  finally {
    if (!divDefault.classList.contains("hide")) {
      divDefault.classList.toggle("hide");
    }

    if (inputBack.classList.contains("hide")) {
      inputBack.classList.toggle("hide");
    }

  }

  // TODO: check the text isn't more than 100chars before submitting
  // event.preventDefault();
};
