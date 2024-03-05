import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }

    //signup
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                return this.loginAccount({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw(error);
        }
    }

    //signin
    async loginAccount({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw(error);
        }
    }

    //get user account
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    //logout
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
};

const authService = new AuthService();

export default authService;