export async function GET(req:Request){
    try{
    console.log("top")
    const res = await fetch("http://localhost:8000/api/products")
    console.log("middle")
    const response = await res.json()
    console.log(response)
    return Response.json(response.data)
    }catch(error){
        console.log("loklolo",error)
    }
    console.log("eh")
   
  }