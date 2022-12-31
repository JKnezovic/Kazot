Parse.Cloud.define("createNewOrder", async (request) => {
  let client = null;
  let vehicle = null;
  let orderState = request.params.orderState;
  const params = {
    orderState: orderState,
  };
  try {
    //If existing client was not selected create new client
    var clientExist = await Parse.Cloud.run("ClientExistsCheck", params);
    if (clientExist) client = clientExist;
    else client = await Parse.Cloud.run("SaveNewClient", params);
    console.log("neworder", client);
    if (client === false) {
      throw new Error("Failed client creation");
    }
    params.clientId = client.id;

    //If serial number exist check if vehicle already exist for user, if not create a new one
    if (orderState.model) {
      var isNew = await Parse.Cloud.run("IsNewVehicleForClient", params);
      if (isNew.length === 0) {
        vehicle = await Parse.Cloud.run("SaveNewVehicle", params);
        if (vehicle === false) {
          return;
        }
      } else vehicle = isNew[0];
    } else vehicle = null;

    var service_id = await Parse.Cloud.run("ServiceIDParser", params);
    console.log("serviceId", service_id);
    params.service_id = service_id;
    if (vehicle) {
      params.vehicleId = vehicle.id;
    } else params.vehicleId = null;
    //Create service order with client and vehicle foreign key
    console.log("params", params);
    var serviceOrder = await Parse.Cloud.run("SaveServiceOrder", params);
    if (serviceOrder === false) {
      throw new Error("Failed service creation");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error creating service order");
  }

  return {
    result: serviceOrder,
  };
});

Parse.Cloud.define("SaveNewClient", async (request) => {
  const myObj = new Parse.Object("Clients");
  myObj.set("name", request.params.orderState.name);
  myObj.set("surname", request.params.orderState.surname);
  myObj.set("email", request.params.orderState.email);
  myObj.set("contact", request.params.orderState.contact);
  const result = await myObj.save();
  return result;
});

Parse.Cloud.define("SaveNewVehicle", async (request) => {
  var client = new Parse.Object("Clients");
  client.set("objectId", request.params.clientId);
  const myObj = new Parse.Object("Vehicles");
  myObj.set("model", request.params.orderState.model);
  myObj.set("serial_number", request.params.orderState.serialNumber);
  myObj.set("client_fkey", client);
  const result = await myObj.save();
  return result;
});

Parse.Cloud.define("IsNewVehicleForClient", async (request) => {
  var client = new Parse.Object("Clients");
  client.set("objectId", request.params.clientId);
  try {
    let query1 = new Parse.Query("Vehicles");
    query1.equalTo("client_fkey", client);
    let query2 = new Parse.Query("Vehicles");
    query2.equalTo("model", request.params.orderState.model);
    let query = new Parse.Query("Vehicles");
    query._andQuery([query1, query2]);
    let queryResult = await query.find();
    return queryResult;
  } catch (error) {
    return false;
  }
});

Parse.Cloud.define("ServiceIDParser", async (request) => {
  let Service = new Parse.Query("Services");
  Service.descending("service_id");
  Service.limit(1);

  try {
    var result = await Service.find();
    console.log("result:", result);
    let string_id = result[0]
      .get("service_id")
      .split("SO-")
      .pop()
      .split("-")[0];
    console.log("string:", string_id);
    let number = parseInt(string_id) + 1;
    console.log("number:", number);
    let service_id =
      "SO-" +
      "0".repeat(6 - number.toString().length) +
      number.toString() +
      "-" +
      request.params.orderState.date.getFullYear().toString().slice(-2);
    console.log("service_iddddd:", service_id);
    return service_id;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    return false;
  }
});

Parse.Cloud.define("SaveServiceOrder", async (request) => {
  var client = new Parse.Object("Clients");
  client.set("objectId", request.params.clientId);

  if (request.params.vehicleId) {
    var vehicle = new Parse.Object("Vehicles");
    vehicle.set("objectId", request.params.vehicleId);
  }

  let Service = new Parse.Object("Services");
  Service.set("issue", request.params.orderState.problem);
  Service.set("notes", request.params.orderState.notes);
  Service.set("type", request.params.orderState.serviceType);
  Service.set("service_id", request.params.service_id);
  Service.set("service_date", request.params.orderState.date);
  Service.set("status", "Created");
  Service.set("client_fkey", client);

  if (request.params.vehicleId) {
    Service.set("vehicle_fkey", vehicle);
  }

  try {
    var serviceOrder = await Service.save();
    return serviceOrder;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    return false;
  }
});

Parse.Cloud.define("ClientExistsCheck", async (request) => {
  let clientQuery = new Parse.Query("Clients");
  clientQuery.equalTo("name", request.params.orderState.name);
  clientQuery.equalTo("contact", request.params.orderState.contact);

  try {
    let clientResult = await clientQuery.find();
    if (clientResult.length === 0) {
      return false;
    } else return clientResult[0];
  } catch (error) {
    // Error can be caused by lack of Internet connection
    return false;
  }
});
