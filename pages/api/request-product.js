// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if (req.method === "POST") {
        
      try {
        const data = await doRequest("request-products", "POST", req.body ,
          );

        res.status(200).json({ success: true});

      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    } 
    
    else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
  const doRequest = async (url, method, data) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN}`,
    };
    try {
      let options = {
        method,
        headers,
        body:JSON.stringify(data), // Changed `data` to `body`
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${url}`,
        options
      );
      // Check if the response is ok (status in the range 200-299)

        const json = await res.json();
        return json.data;
     
    } catch (error) {
      console.error("Error making request:", error);
      return null; // Or throw an error or handle as needed
    }
  };
  