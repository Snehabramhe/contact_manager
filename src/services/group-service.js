import axios from "axios";

export class GroupService{
    static url = "https://contact-data-vzf2.onrender.com/groups";

    static getAllGroups(){
        return axios.get(`${this.url}`);
    }

    static getGroup(contact){
        const {groupId} = contact;
        if(groupId){
            return axios.get(`${this.url}/${groupId}`);
        }
        else return null;
    }

}