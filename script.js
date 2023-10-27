const showEmailResult = async (e) => {
    e.preventDefault();
    const result = document.getElementById("result");
    let response = await getEmailResult();
    if (response.status == 200) {
      result.innerHTML = "You're now subscribed to: Ali Jamil.";
    } else {
      result.innerHTML = "Sorry, there was an error in signing up.";
    }
  };
  
  const getEmailResult = async (e) => {
    const form = document.getElementById("subscribe-form");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("result");
    result.innerHTML = "Please wait...";
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      return response;
    } catch (error) {
      console.log(error);
      document.getElementById("result").innerHTML =
        "Sorry, your email could not be sent.";
    }
  };
  
window.onload = () => {
    document.getElementById("subscribe-form").onsubmit = showEmailResult;
}