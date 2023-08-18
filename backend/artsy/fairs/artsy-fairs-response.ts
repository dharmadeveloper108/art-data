type FairLinks = {
    self: {
        href: string;
    };
    shows: {
        href: string;
    };
};

type FairItem = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    about: string;
    contact: string;
    summary: string;
    start_at: string;
    end_at: string;
    status: string;
    published: boolean;
    _links: FairLinks;
};

type ArtsyFairsResponse = {
    total_count: null;
    _links: {
        self: {
            href: string;
        };
        next: {
            href: string;
        };
    };
    _embedded: {
        fairs: FairItem[];
    };
};
