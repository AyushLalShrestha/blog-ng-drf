// import { Ingredient } from '../shared/ingredient.model';

export class UserProfile {
    public bio: string;
    public location: string;
    public phone: string;
    public profilesUser: User;
    constructor(username: string, email: string, first_name: string, last_name: string, bio: string, location: string, phone: string) {
        this.bio = bio;
        this.location = location;
        this.phone = phone;
        this.profilesUser = new User(username, email, first_name, last_name);
    }
}

export class User {
    public username: string;
    public email: string;
    public first_name: string;
    public last_name: string;

    constructor(username: string, email: string, first_name: string, last_name: string) {
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }

}



