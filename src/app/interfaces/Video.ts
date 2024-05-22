export interface Video {
    id_video: number;
    youtube_url: string;
    thumbnail_url: string;
    reference: string;
    title: string;
    category: DevelopmentCategory;
}

export enum DevelopmentCategory {
    WebDevelopment = "Web Development",
    MobileDevelopment = "Mobile Development",
    GameDevelopment = "Game Development",
    SoftwareEngineering = "Software Engineering",
    DataScience = "Data Science",
    ArtificialIntelligence = "Artificial Intelligence",
    Cybersecurity = "Cybersecurity",
    DevOps = "DevOps",
    Blockchain = "Blockchain",
    CloudComputing = "Cloud Computing"
}
