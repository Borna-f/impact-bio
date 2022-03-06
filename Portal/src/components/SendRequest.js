import axios from "axios";

const url = 'http://localhost:3000/ProcessSentence';

class SendRequest {
    static ProcessSentence(sentence) {
        return new Promise((resolve, reject) => {
            try{
                const res = axios.get(url, { params: { sentence } });
                resolve(res)
            } catch(err) {
                reject(err);
            }
        });
    }
}

export default SendRequest;
