import axios from "axios";
import { BASE_URL } from "../config";
export const uploadFile=async(data:any)=>{
    try {
        const formData=new FormData() as any
        formData?.append('image',{
            uri:data?.uri,
            name:data?.name,
            type:data?.type,
        })
        const res=await axios.post(`${BASE_URL}/file/upload`,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
        return res.data?.mediaUrl;
    } catch (error) {
        console.log(error);
        return null
    }
}