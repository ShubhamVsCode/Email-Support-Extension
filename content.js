window.addEventListener("load", () => {
  console.log("Website loaded");
  //   const container = document.getElementsByClassName("gK")[1];
  //   container?.appendChild(respondedBtn);

  async function postData(data) {
    console.log("Posting data " + JSON.stringify(data));

    const result = await fetch(
      "https://brown-artist-oykby.pwskills.app:4000/",
      {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => console.log("Result", result))
      .catch((err) => console.log("Error from backend " + err));

    console.log(result);
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  }

  const targetElement = document.querySelector("body");

  const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (
        document.getElementsByClassName("gK")?.length > 0 &&
        document.getElementsByClassName("gK")[1]?.lastChild?.tagName !==
          "BUTTON"
      ) {
        const respondedBtn = document.createElement("button");
        respondedBtn.innerText = "Responded";
        const container = document.getElementsByClassName("gK")[1];

        let email = document
          .getElementsByClassName("go")[0]
          ?.innerText.substring(
            1,
            document.getElementsByClassName("go")[0].innerText.length - 1
          );

        if (!email) {
          const showDetailBtn = document.querySelector(
            "[aria-label='Show details']"
          );
          if (showDetailBtn) {
            showDetailBtn.click();
            showDetailBtn.click();
          }

          email = document
            .getElementsByClassName("go")[0]
            ?.innerText.substring(
              1,
              document.getElementsByClassName("go")[0].innerText.length - 1
            );
        }

        let date = new Date(document.getElementsByClassName("g3")[0]?.title);
        let subject = document.getElementsByClassName("hP")[0]?.innerText;
        let smeName = localStorage.getItem("name");
        if (!localStorage.getItem("name")) {
          const name = prompt("Please enter your name");
          localStorage.setItem("name", name);
          smeName = name;
        }
        let fullEmail =
          document.getElementsByClassName("gb_d gb_Fa gb_x")[0]?.ariaLabel;

        if (fullEmail) {
          fullEmail = fullEmail.substring(
            fullEmail.indexOf("(") + 1,
            fullEmail.indexOf(")")
          );
          if (fullEmail === "query@ineuron.ai") {
            fullEmail = "Query_ineuron";
          } else if (fullEmail === "support@pwskills.com") {
            fullEmail = "Pw_Skills";
          }
        }
        let platform = fullEmail;
        let mailType = "Non-technical";
        let mailStatus = "Open";

        const data = {
          email,
          date,
          platform,
          subject,
          mailType,
          smeName,
          mailStatus,
        };

        respondedBtn.style.width = "130px";
        respondedBtn.style.height = "40px";
        respondedBtn.style.color = "#fff";
        respondedBtn.style.borderRadius = "5px";
        respondedBtn.style.padding = "10px 25px";
        respondedBtn.style.fontFamily = "'Lato', sans-serif";
        respondedBtn.style.fontWeight = "500";
        respondedBtn.style.background = "#030303";
        respondedBtn.style.cursor = "pointer";
        respondedBtn.style.transition = "all 0.3s ease";
        respondedBtn.style.position = "relative";
        respondedBtn.style.display = "inline-block";
        respondedBtn.style.outline = "none";

        // Create the select element
        const selectElement = document.createElement("select");

        // Define the options
        const options = [
          "Non-technical",
          "Technical",
          "Feedback",
          "Escalation",
        ];
        // Create and append options to the select element
        options.forEach((optionText) => {
          const option = document.createElement("option");
          option.text = optionText;
          selectElement.appendChild(option);
        });

        selectElement.style.zIndex = 1000;
        selectElement.style.padding = "10px";
        selectElement.style.marginRight = "10px";

        selectElement.addEventListener("change", (event) => {
          data.mailType = event.target.value;
        });

        container?.appendChild(selectElement);
        console.log("Select element created");
        container?.appendChild(respondedBtn);
        console.log("Responded button added to container");
        respondedBtn.addEventListener("click", () => {
          postData(data);
          console.log("data posted", data);
        });
      }

      if (mutation.type === "childList") {
        console.log("Child elements have been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log("Attribute has changed.");
      }
    }
  });

  // Configuration for the observer
  const config = {
    childList: true, // Observe additions/removals of child elements
    subtree: true, // Observe changes in descendant elements as well
  };

  // Start observing the target element with the provided configuration
  observer.observe(targetElement, config);
});
