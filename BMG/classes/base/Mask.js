class Mask extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
    }

	render() {
        return(
            <div className={this.props.active ? "cl-mask active" : "cl-mask"} onClick={this.props._onClick}></div>
        ) 
    }
}