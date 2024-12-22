import axios from "axios";

export class ContactService {
    static url = "https://contact-data-vzf2.onrender.com/contacts";

    static getAllContacts(){
        return axios.get(`${this.url}`);
    }

    static getContact(contactId){
        return axios.get(`${this.url}/${contactId}`);
    }

    static addContact(contact){
        return axios.post(`${this.url}`,contact);
    }

    static editContact(contact,contactId){
        return axios.put(`${this.url}/${contactId}`,contact);
    }

    static deleteContact(contactId){
        return axios.delete(`${this.url}/${contactId}`);
    }
    // with the help of contact we will get the pre-filled data , and with the help of 
    // contactId we will get to know which contact admin should update  
}