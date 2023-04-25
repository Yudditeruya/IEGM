class TextObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '...' };
    }

    componentDidMount() {
        this.getObject();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.objectId != prevProps.objectId) {
            if (this.state.id) this.props.app.destroySessionObject(this.state.id)
            this.getObject();
        }

    }

    getObject() {
        this.props.app.visualization.get(this.props.objectId).then((res) => {
            res.model.getProperties().then((res) => {
                var def = res.qHyperCubeDef;
                this.props.app.createCube(def, (res) => {
                    this.setState({ id: res.qInfo.qId, text: res.qHyperCube.qGrandTotalRow[0].qText })
                })
            })
        })
    }

    componentWillUnmount() {
        if (this.state.id) {
            this.props.app.destroySessionObject(this.state.id);
        }
    }

    render() {
        return <span className={this.props.className}>
        {this.props.titleIndicator ? <div style={{ backgroundColor: this.props.titleIndicator }} class="circle-indicator"></div> : ''}
        {this.state.text}</span>
    }
}