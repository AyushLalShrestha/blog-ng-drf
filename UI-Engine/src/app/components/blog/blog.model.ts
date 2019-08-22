
export class Blog {
    public blog_pk: number;
    public title: string;
    public content: string;
    public user: User;
    public read_time: number;
    public publish: Date;
    public claps: number;
    public image: string;
    public tags: string[] = [];

    constructor(blog_pk: number, title: string, content: string,
         read_time: number, publish: Date, claps: number, tags: string[],
        username: string, email: string, first_name: string, 
        last_name: string, bio: string, location: string, phone: string
        , image: string = null) {
        this.blog_pk = blog_pk;
        this.title = title;
        this.content = content;
        this.read_time = read_time;
        this.publish = publish;
        this.tags = tags;
        this.user = new User(username, email, first_name, last_name, bio, location, phone);
        this.image = image;
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

export class Profile {
    public bio: string;
    public location: string;
    public phone: string;

    constructor(bio: string, location: string, phone: string) {
        this.bio = bio;
        this.location = location;
        this.phone = phone;
    }
}



