import { client } from "../index.js";


export async function createuser(data){
    return await client.db("kssmart").collection("user").insertOne(data);
}

export async function getuserbyid(username){
    return await client.db("kssmart").collection("user").findOne({username:username});
}

export async function createemployerdetails(data){
    return await client.db("kssmart").collection("details").insertOne(data);
}

export async function getallemployerdetails(){
    return await client.db("kssmart").collection("details").find({}).toArray();
}

export async function deleteemployee(id){
    return await client.db("kssmart").collection("details").deleteOne({id:id});
}

export async function updateemployebyid(id, data) {
    return await client.db("kssmart").
      collection("details").
      updateOne({ id: id }, { $set: data });
  }