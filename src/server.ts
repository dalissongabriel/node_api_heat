import { serverHttp } from "./app";

serverHttp.listen(process.env.API_PORT, () => console.log(`Server is running in ${process.env.API_PORT}`));