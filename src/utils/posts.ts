export interface PostData {
    frontmatter: {
        title: string;
        date: string;
        description?: string;
        image?: string;
    };
    url: string;
};

export class Post {
    title: string;
    date: Date;
    description?: string;
    image?: string;
    url: string;

    constructor(data: PostData) {
        this.title = data.frontmatter.title;
        this.date = new Date(data.frontmatter.date);
        this.description = data.frontmatter.description;
        this.image = data.frontmatter.image;
        this.url = data.url;
    }

    get formattedDate(): string {
        return this.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
}
