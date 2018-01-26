import React, {Component} from "react";
import SlickCarousel from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "src/app/components/image";

import Album from "src/resources/images/main/album.png";

// import css
import * as styles from "./styles.css";

export default class Carousel extends Component {

	constructor(props) {
		super(props);

		this.onSlideChange = this.onSlideChange.bind(this);

		this.state = {
			currentIndex: 0
		}
	}

	componentDidMount() {
	}

	onSlideChange(index) {
		this.props.onSlideChange(index);
	}


	render() {
			var _this = this;

			var settings = {
				dots: true,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				afterChange: index => {
					_this.onSlideChange(index);
				}
			};


			var carouselContent = this.props.playList.map(function(song) {
				console.log(song.picture_url);
				return <div className={`${styles["img-container"]}`}><Image key={song.id} src={song.picture_url} fallbackSrc={Album}/></div>;
			});

		return (
			
		
			<div className={`${styles["carousel-container"]}`}>
				<SlickCarousel {...settings}>
					{carouselContent}
				</SlickCarousel>
			</div>

		);

	}
}