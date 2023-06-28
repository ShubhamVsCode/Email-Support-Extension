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

        container?.appendChild(respondedBtn);
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
