// import {useState,useEffect} from "react";
// import axios from "axios";

// export default useFetch = (url, body, method="POST") => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [apiData, setApiData] = useState(null);
//     const [apiError, setapiError] = useState(null);
  
//     useEffect(() => {
//       setIsLoading(true);
//       const fetchData = async () => {
//         try {
//           const resp = await axios({
//             method: method,
//             url: url,
//             data: body
//           });
//           const data = await resp?.data;
  
//           setApiData(data);
//           setIsLoading(false);
//         } catch (error) {
//           setapiError(error);
//           setIsLoading(false);
//         }
//       };
  
//       fetchData();
//     }, [url, method, body]);
  
//     return { isLoading, apiData, apiError };
//   };