interface ProjectLink {
    text: string;
    url: string;
    icon?: string;
};

export interface ProjectData {
    frontmatter: {
        title: string;
        date: string;
        description?: string;
        image: string;
        links?: ProjectLink[];
    };
    url: string;
};

export class Project {
    title: string;
    date: Date;
    description?: string;
    image: string;
    url: string;
    links: ProjectLink[] = [];

    constructor(data: ProjectData) {
        this.title = data.frontmatter.title;
        this.date = new Date(data.frontmatter.date);
        this.description = data.frontmatter.description;
        this.image = data.frontmatter.image;
        this.url = data.url;
        if (data.frontmatter.links)
            this.links = data.frontmatter.links;
    }

    get formattedDate(): string {
        return this.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
}
