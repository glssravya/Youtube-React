/*import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YSearch from 'youtube-api-search';
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyATmz8M1GyuGG5kqKh3pA3K6QXRrU6hHeQ';


class App extends Component{
	constructor(props){
		super(props);
		
		this.state = {videos:[]};

		YSearch({key:API_KEY,term:'nutrition'}, videos => {
			this.setState({videos}); //this.setState({videos:videos});
		});
	}
	render(){
	
		return (<div>

				<SearchBar />
				<VideoList videos={this.state.videos}/>

				</div>);
	}
}


ReactDOM.render(<App />,document.querySelector('.container'));*/
import _ from 'lodash';
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import YSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyATmz8M1GyuGG5kqKh3pA3K6QXRrU6hHeQ';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {videos:[],
					selectedVideo:null	
					};
		this.videoSearch('Rujutha diwekar');
		
	}

	videoSearch(term){
		YSearch({key:API_KEY,term:term},videos => {
			this.setState({
						videos:videos,
						selectedVideo:videos[0]	
						}) ;
		})
	}
	
	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
		return (
			<div> <SearchBar onSearchTermChange={videoSearch}/> 
			<VideoDetail video={this.state.selectedVideo} />
			<VideoList 
			onVideoSelect={selectedVideo => this.setState({selectedVideo})}
			videos={this.state.videos}/>
			</div>
		);
	}
}

ReactDom.render(<App />,document.querySelector('.container'));