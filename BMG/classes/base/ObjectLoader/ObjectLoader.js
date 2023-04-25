class ObjectLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div style={this.props.loaderStyle} class="cl-loader__container">
            <div style={this.props.customStyle} class="object-spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </div>;
    }
}



