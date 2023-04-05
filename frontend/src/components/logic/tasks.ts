import axios from "axios"

export const getTaskSome = async ({sdk, connected, safe}:any) => {
    await axios.post('http://0.0.0.0:7070/api') 

}