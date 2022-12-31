// Require the module
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
// Set up the Body Parser to your App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/calendlyWebhook", async (req, res) => {
  console.log("request body", req.body);

  var api_token =
    "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjY5MDY4OTkwLCJqdGkiOiJhYTUxMWNjNy04ZjVjLTRjOTUtODcxYy1kODc0ZjQ4YzdkMGUiLCJ1c2VyX3V1aWQiOiIwNTRlOTE5MC03ZGY0LTQxMWYtOTVlMC02ZjI5NTNiN2U3NzUifQ.NuO-xkGptChBIwXVEtTeumrwh37IWurp0fgrsGet7S83QjJe5ybjIa77WZnobjntX-QpBIDVygVrRWZx-fQMRA";
  var api_url = req.body.payload.event;

  var requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + api_token,
    },
    redirect: "follow",
  };

  const response = await fetch(api_url, requestOptions).catch(
    console.log("error")
  );
  const data = await response.json();
  console.log("time:", data.resource.start_time);

  async function checkIfServiceExists(date_value) {
    const query = new Parse.Query("Services");
    // You can also query by using a parameter of an object
    query.equalTo("service_date", new Date(date_value));
    try {
      const results = await query.find();
      if (results.length) return false;
      else return true;
    } catch (error) {
      console.error("Error while fetching Services", error);
      return false;
    }
  }

  var doesExist = await checkIfServiceExists(data.resource.start_time);
  if (doesExist) {
    const orderState = {
      name: req.body.payload.first_name,
      surname: req.body.payload.last_name,
      contact: req.body.payload.questions_and_answers[0].answer,
      email: req.body.payload.email,
      date: new Date(data.resource.start_time),
      client: null,
      serviceType: "Calendly",
      serialNumber: "",
      model: req.body.payload.questions_and_answers[1].answer,
      problem: req.body.payload.questions_and_answers[2].answer,
      notes: "Calendly " + data.resource.name,
    };
    const params = {
      orderState: orderState,
    };

    let serviceOrder = await Parse.Cloud.run("createNewOrder", params);
    console.log("order:", serviceOrder.result);

    const StatusHistory = new Parse.Object("OrderStatusHistory");
    try {
      StatusHistory.set("status", "Created");
      StatusHistory.set("service_fkey", serviceOrder.result);
      StatusHistory.set("user_name", "Calendly");
      const result = await StatusHistory.save();
      return true;
    } catch (error) {
      console.error("error", error);
    }
  } else console.log("duplicate webook payload");

  return res.send({ message: "Hello world" });
});
