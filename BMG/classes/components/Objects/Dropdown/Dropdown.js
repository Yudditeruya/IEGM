class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iconClass: 'fal fa-angle-down',
            classDiv: "dropdown",
            classListEl: "dropdown-toggle-list",
            active: this.props.values[0]
        }
        this.id = Utils.generateId();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.clickClose);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickClose);
    }

    clickClose(event) {
        if (event.target.closest("#" + this.id) || event.target.closest("#" + this.id)) {
            return;
        }
        this.setState({opened: false});
    }

    toggleMenu() {
        this.setState({opened: !this.state.opened});
    }

    changeActive(element) {
        if (this.props.onSelect) {
            this.props.onSelect(element);
        }
        this.setState({active: element, opened: false});
    }

    render() {
        let list = [];
        if (this.props.values) {
            this.props.values.forEach((element) => {
                list.push(<button className={element.name == this.state.active.name ? 'dropdown-button drop-active' : 'dropdown-button'} onClick={() => { this.changeActive(element) }}>
                    <span>{element.name}</span>
                </button>)
            });
        }

        let isOpened = this.state.opened;

        return <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-start' }}>
            <div id={this.id} className={isOpened ? 'dropdown dropdown-active' : 'dropdown'} onClick={this.toggleMenu} >
                <span className='dropdown-current'> {this.state.active.name} </span>
                <div className='dropdown-arrow'> <i className={isOpened ? 'fal fa-angle-up' : 'fal fa-angle-down'}></i></div>
            </div>
            <div id={this.id} className={isOpened ? 'dropdown-toggle-list drop-opened' : 'dropdown-toggle-list'}>
                {list}
            </div>
        </div>

    }
}