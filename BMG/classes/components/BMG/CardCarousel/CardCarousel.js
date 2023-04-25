
class CardCarousel extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
	} 

	render() {
	return <div class={"bmg-card-carousel"}>
		<div className={"bmg-card-carousel__title-container"}>
			{this.props.icon}
			<h2 className={"bmg-card-carousel__title"}>{this.props.title}</h2>
		</div>
		{this.props.children}
	</div>;
    }
}
