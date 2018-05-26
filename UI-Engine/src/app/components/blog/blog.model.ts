// import { Ingredient } from '../shared/ingredient.model';

export class Blog {
    public title: string;
    public content: string;
    public user: User;
    public read_time: number;
    public publish: Date;
    public claps: number;

    constructor(title: string, content: string, read_time: number, publish: Date, claps: number,
        username: string, email: string, first_name: string, last_name: string, bio: string, location: string, phone: string) {
        this.title = title;
        this.content = content;
        this.read_time = read_time;
        this.publish = publish;
        this.user = new User(username, email, first_name, last_name, bio, location, phone);
    }
}

export class User {
    public username: string;
    public email: string;
    public first_name: string;
    public last_name: string;
    public profile: Profile;

    constructor(username: string, email: string, first_name: string, last_name: string, bio: string, location: string, phone: string) {
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile = new Profile(bio, location, phone);
    }
}

class Profile {
    public bio: string;
    public location: string;
    public phone: string;

    constructor(bio: string, location: string, phone: string) {
        this.bio = bio;
        this.location = location;
        this.phone = phone;
    }
}

