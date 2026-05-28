async function Call(base, useCase, data, method) {
    let response;
    if (!method || method === "GET") {
        response = await fetch(`${base}/${useCase}${data && Object.keys(data).length ? `?${new URLSearchParams(data)}` : ""}`);
    }
    else {
        response = await fetch(`${base}/${useCase}`, {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        })
    }
    const returnData = await response.json()
    return { ok : response.ok, status : response.status, returnData}
}

 const base = "http://localhost:3000"

const FetchHelperLine = {
        chore : {
            get : async (data) => {
                return await Call(base, "chore/get", data, "GET")
            },
            post : async (data) => {
                return await Call(base, "chore/post", data, "POST")
            },
            update : async (data) => {
                return await Call(base, "chore/update", data, "POST")
            },
            delete : async (data) => {
                return await Call(base, "chore/delete", data, "POST")
            },
            list : async (data={}) => {
                return await Call(base, "chore/list", data, "GET")
            },
            complete :  async (data) => {
                return await Call(base, "chore/complete", data, "POST")
            }
        },
        category : {
            get : async (data) => {
                return await Call(base, "category/get", data, "GET")
            },
            post : async (data) => {
                return await Call(base, "category/post", data, "POST")
            },
            update :  async (data) => {
                return await Call(base, "category/update", data, "POST")
            },
            delete :  async (data) => {
                return await Call(base, "category/delete", data, "POST")
            },
            list : async () => {
                return await Call(base, "category/list", null, "GET")
            },
        }

    }

export default FetchHelperLine;

