const formEl = document.querySelector(".form1");
        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(formEl);
            const dataOfForm = Object.fromEntries(formData);
            // console.log(dataOfForm);



            var x = "";



            fetch("http://localhost:3000/items")
                .then((res) => res.json())
                .then((json) => {
                    json.map((dataJson) => {

                        // console.log(dataJson);
                        // console.log("form vadu:", dataOfForm.email);
                        //     console.log("database vadu:", dataJson.mail);
                        if (dataOfForm.email == dataJson.mail) {

                            x = dataJson;
                            // console.log(x);
                        }
                    });


                    if (x == "") {
                        alert("Email not Found");
                    }
                    else if (x.password == dataOfForm.password) {
                        console.log(x.name);
                        var person2 = {
                            "id":x.name
                        }
                        fetch("http://localhost:3000/idd", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(person2),
                        });
                        openNewURLInTheSameWindow("http://127.0.0.1:5500/Intenship/jsonMate/dashboard.html");

                    }
                    else {
                        if (document.getElementById("password").value == "") {
                            alert("Please Enter Password");
                        }
                        else {
                            alert("Khotu");
                        }

                    }


                });












            // fetch("http://localhost:3000/items", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data),
            // });
            // openNewURLInTheSameWindow("http://127.0.0.1:5500/Intenship/jsonMate/login.html");



        });


        function fireClickEvent(element) {
            var evt = new window.MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            element.dispatchEvent(evt);
        }

        // this function will setup a virtual anchor element
        // and fire click handler to open new URL in the same room
        // it works better than location.href=something or location.reload()
        function openNewURLInTheSameWindow(targetURL) {
            var a = document.createElement('a');
            a.href = targetURL;
            fireClickEvent(a);
        }