export type Fair = {
    artsyId: string;
    title: string;
    description?: string;
    artsyLink: string;
}

export const formatFair = (response: FairItem): Fair => {
    const artsyId = response.id;
    const artsyLink = response._links.self.href;
    const title = response.name;
    const description = response.about;
    return { artsyId, artsyLink, title, description };
};