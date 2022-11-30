import axios from "axios";

export default class ApiException {
    constructor(error: any) {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
        } else {
            throw new Error(error);
        }

    }
}