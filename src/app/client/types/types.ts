export type SingleNFTCategory = {
  name: string;
  id: number;
}
export type SingleNFTItem = {
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  _embedded: {
    'wp:featuredmedia': {
      source_url: string
    }[]
  }

}