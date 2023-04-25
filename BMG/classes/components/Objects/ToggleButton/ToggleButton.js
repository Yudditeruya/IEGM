class ToggleButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.values[0]
        }
        this.id = Utils.generateId();
    }

    changeActive(element) {
        if (this.props.onSelect) {
            this.props.onSelect(element);
        }
        this.setState({ active: element, opened: false });
    }

    render() {
        let list = [];
        if (this.props.values) {
            this.props.values.forEach((element) => {
                list.push(<button className={element.name == this.state.active.name ? 'bmg-btn-select inverse active' : 'bmg-btn-select inverse '}
                    onClick={() => { this.changeActive(element) }}>
                    <span>{element.name}</span>
                </button>)
            });
        }

        return <div style={{ display: "flex" }}>
            {list}
        </div>

    }
}