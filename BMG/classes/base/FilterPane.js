class FilterPane extends React.Component {

    constructor(props){
		super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
    }

    handleClick() {
        this.props.app.getObject("current-filter", this.props.filterObject.qInfo.qId);
        this.props._onClickMessage("");
    }
    
    render(){
        var filterObject = this.props.filterObject;
        return(
            <button className="js-filtroBtn style-filtroBtn" onClick={() => {this.handleClick()}} value={filterObject.qInfo.qId} >{filterObject.qMeta.title}</button>
        )

    }
} 