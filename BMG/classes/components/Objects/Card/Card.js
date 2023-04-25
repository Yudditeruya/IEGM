class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return <div className={this.props.className ? "cl-card " +this.props.className : "cl-card"} style={this.props.style}>
            {this.props.children}
        </div>
    }
}