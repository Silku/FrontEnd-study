class YouTube{
    constructor(key){
		this.key = key;
		this.getRequestoptions = {
			method : 'GET',
			redirect : 'follow',

		};
	}
	async mostPopular(){
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&regionCode=KR&chart=mostPopular&key=${this.key}`, this.getRequestoptions
		);
		const result = await response.json();
		return result.items;
	}

	async search(query){
		//myError :  part=snippet 옵션이없어서 몇시간 고통
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&regionCode=KR&q=${query}&key=${this.key}&type=video`, this.getRequestoptions
		)
		const result = await response.json();
		return result.items.map(item=>({...item, id: item.id.videoId}));
	}
}


export default YouTube;