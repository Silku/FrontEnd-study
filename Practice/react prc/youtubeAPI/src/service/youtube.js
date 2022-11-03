class YouTube{
// axios 스타일
	constructor(httpClient) {
		this.youtube = httpClient;
	}

	async mostPopular(){
		const response = await this.youtube.get('videos', {
			params: {
				part:'snippet',
				chart : 'mostPopular',
				regionCode : 'KR',
				maxResults:20,
			}
		})
		return response.data.items;
	}

	async search(query){
		const response = await this.youtube.get('search', {
			params: {
				part:'snippet',
				regionCode : 'KR',
				maxResults:20,
				type: 'video',
				q: query
			},
		})
		return response.data.items.map(item => ({...item, id: item.id.videoId}));
	}
}


export default YouTube;