export type ArtsyResponse = {
  total_count: number;
  offset: number;
  q: string;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    results: Array<ArtsyResult>;
  };
};

export type ArtsyResult = {
  type: string;
  title: string;
  description: string | null;
  og_type: string;
  _links: {
    self: {
      href: string;
    };
    permalink: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
};
